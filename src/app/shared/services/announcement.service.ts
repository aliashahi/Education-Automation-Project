import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from '../classes/service-base';
import { Class } from 'src/app/manager/models/class.model';
import { TokenDecoderPipe } from '../pipes/token-decoder.pipe';
import { UserInfoPipe } from '../pipes/user-info.pipe';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService extends ServiceBase {
  userPipe!: UserInfoPipe;
  constructor(_inject: Injector) {
    super(_inject);
    this.userPipe = _inject.get(UserInfoPipe);
  }

  private get personId(): string {
    return this.userPipe.transform('0', 'id');
  }

  private get _AnnouncementBaseUrl(): string {
    return `school/announcement/${this.personId}`;
  }

  getAnnouncements(searchModel: any) {
    return this.get$(
      `${this._AnnouncementBaseUrl}/list/`,
      this.createParamList(searchModel)
    );
  }

  getAnnouncementsById(id: number) {
    return this.get$(`${this._AnnouncementBaseUrl}/list/${id}`);
  }

  createAnnouncements(searchModel: any) {
    return this.post$(`${this._AnnouncementBaseUrl}/create`, searchModel);
  }

  deleteAnnouncements(id: number) {
    return this.delete$(`${this._AnnouncementBaseUrl}/delete/${id}`);
  }
}
