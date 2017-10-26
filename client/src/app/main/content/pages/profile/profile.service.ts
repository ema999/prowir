import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../../../../core/services/user.service';

@Injectable()
export class ProfileService implements Resolve<any>
{
    id: number;
    timeline: any;
    about: any;
    photosVideos: any;

    timelineOnChanged: BehaviorSubject<any> = new BehaviorSubject({});
    aboutOnChanged: BehaviorSubject<any> = new BehaviorSubject({});
    photosVideosOnChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient, private userService: UserService)
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

          this.id = +route.params.id;

          Promise.all([
              //this.getTimeline(),
              this.getAbout()
              //this.getPhotosVideos()
          ]).then(
              () => {
                  resolve();
              },
              (reject)
          );

        });
    }

    /**
     * Get timeline
     */
    getTimeline(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this.http.get('api/profile-timeline')
                .subscribe((timeline: any) => {
                    this.timeline = timeline.data;
                    this.timelineOnChanged.next(this.timeline);
                    resolve(this.timeline);
                }, reject);
        });
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this.userService.getAccount(this.id, (err, data)=>{
              if(err) {
                this.about = false;
                this.aboutOnChanged.next(this.about);
                resolve(this.about);
              }
              this.about = data;
              this.aboutOnChanged.next(this.about);
              resolve(this.about);
            });

        });
    }

    /**
     * Get photos & videos
     */
    getPhotosVideos(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this.http.get('api/profile-photos-videos')
                .subscribe((photosVideos: any) => {
                    this.photosVideos = photosVideos.data;
                    this.photosVideosOnChanged.next(this.photosVideos);
                    resolve(this.photosVideos);
                }, reject);
        });
    }

}
