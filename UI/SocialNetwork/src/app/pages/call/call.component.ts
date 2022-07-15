import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  createLocalAudioTrack,
  Room,
  LocalTrack,
  LocalVideoTrack,
  LocalAudioTrack,
  RemoteParticipant,
} from 'twilio-video';
import { RoomsComponent } from '../rooms/rooms.component';
import { CameraComponent } from '../camera/camera.component';
import { SettingsComponent } from '../settings/settings.component';
import { ParticipantsComponent } from '../participants/participants.component';
import { VideochatService } from 'src/app/shared/services/videochat.service';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, OnDestroy {

  @ViewChild('rooms') rooms: RoomsComponent;
  @ViewChild('camera') camera: CameraComponent;
  @ViewChild('settings') settings: SettingsComponent;
  @ViewChild('participants') participants: ParticipantsComponent;

  activeRoom: Room | null;
  paramSearch: any;

  private notificationHub: HubConnection;

  constructor(private readonly videoChatService: VideochatService, private route:ActivatedRoute, private router: Router) {
  }
  ngOnDestroy(): void {
      this.onLeaveRoom(true);
  }

  onParticipantsChanged(_: boolean) {
    this.videoChatService.nudge();
  }

  async ngOnInit() {
    const builder = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl(`${environment.apiUrl}/notificationHub`);

    this.notificationHub = builder.build();
    this.notificationHub.on('RoomsUpdated', async updated => {
      if (updated) {
        await this.rooms.updateRooms();
      }
    });
    await this.notificationHub.start();

    this.route.queryParams.subscribe(params => {
      this.paramSearch = params['name'];
    });

    if(this.paramSearch)
    {
      setTimeout(() => {
        this.createRoom(this.paramSearch);
      },2000)
    }
    setTimeout(async () => {
      window.addEventListener('beforeunload', () => {
        this.onLeaveRoom(true);
    });

    },3000);


  }
  async onLeaveRoom(_: boolean) {
    if (this.activeRoom) {
      this.activeRoom.disconnect();
      this.activeRoom = null;
    }

    const videoDevice = this.settings.hidePreviewCamera();
    await this.camera.initializePreview(videoDevice! && videoDevice.deviceId);

    this.participants.clear();
    this.router
    .navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
  }

  async onSettingsChanged(deviceInfo?: MediaDeviceInfo) {
    await this.camera.initializePreview(deviceInfo!.deviceId);
    if (this.settings.isPreviewing) {
      const track: any = await this.settings.showPreviewCamera();
      if (this.activeRoom) {
        const localParticipant = this.activeRoom.localParticipant;
        localParticipant.videoTracks.forEach(publication => publication.unpublish());
        await localParticipant.publishTrack(track);
      }
    }
  }

  async createRoom(roomName: string) {
    if (roomName) {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
      }

      this.camera.finalizePreview();

      const tracks: any = await Promise.all([
        createLocalAudioTrack(),
        this.settings.showPreviewCamera()
      ]);
      this.activeRoom =
        await this.videoChatService
          .joinOrCreateRoom(roomName, tracks);

      this.participants?.initialize(this.activeRoom!?.participants);
      this.registerRoomEvents();

      this.notificationHub.send('RoomsUpdated', true);

    }
  }

  private registerRoomEvents() {
    this.activeRoom!
      .on('disconnected',
        (room: Room) => room.localParticipant.tracks.forEach(publication => this.detachLocalTrack(publication.track)))
      .on('participantConnected',
        (participant: RemoteParticipant) => this.participants.add(participant))
      .on('participantDisconnected',
        (participant: RemoteParticipant) => this.participants.remove(participant))
      .on('dominantSpeakerChanged',
        (dominantSpeaker: RemoteParticipant) => this.participants.loudest(dominantSpeaker));
  }

  private detachLocalTrack(track: LocalTrack) {
    if (this.isDetachable(track)) {
      track.detach().forEach(el => el.remove());
    }
  }

  private isDetachable(track: LocalTrack): track is LocalAudioTrack | LocalVideoTrack {
    return !!track
      && ((track as LocalAudioTrack).detach !== undefined
        || (track as LocalVideoTrack).detach !== undefined);
  }

}
