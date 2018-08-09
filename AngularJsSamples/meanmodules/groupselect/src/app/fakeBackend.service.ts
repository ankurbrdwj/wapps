import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import {Campaign} from './campaigns/campaign';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private campaigns: any[];
 private groups: any[];
 private tiers: any[];
  constructor() {
    localStorage.setItem('campaigns', JSON.stringify(this.campaigns));
    localStorage.setItem('groups',JSON.stringify(this.groups));
    localStorage.setItem('tiers',JSON.stringify(this.tiers));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered campaigns
    localStorage.setItem('campaigns', JSON.stringify(this.campaigns));
    localStorage.setItem('groups',JSON.stringify(this.groups));
    localStorage.setItem('tiers',JSON.stringify(this.tiers));
    let campaigns: Campaign[] = JSON.parse(localStorage.getItem('campaigns')) || [];

    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        // find if any campaign matches login credentials
        let filteredcampaigns = campaigns.filter(campaign => {
          return campaign.id === request.body.id ;
        });

        if (filteredcampaigns.length) {
          // if login details are valid return 200 OK with campaign details and fake jwt token
          let campaign = filteredcampaigns[0];
          let body = {
            id: campaign.id,
            campaignname: campaign.name,
            token: 'fake-jwt-token'
          };

          return Observable.of(new HttpResponse({ status: 200, body: body }));
        } else {
          // else return 400 bad request
          return Observable.throw('Username or password is incorrect');
        }
      }

      // get campaigns
      if (request.url.endsWith('/api/campaigns') && request.method === 'GET') {
        // check for fake auth token in header and return campaigns if valid, this security is implemented server side in a real application
        //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return Observable.of(new HttpResponse({ status: 200, body: campaigns }));
        /*} else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }*/
      }

      // get campaign by id
      if (request.url.match(/\/api\/campaigns\/\d+$/) && request.method === 'GET') {
        // check for fake auth token in header and return campaign if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find campaign by id in campaigns array
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedCampaigns = campaigns.filter(campaign => { return campaign.id === id; });
          let campaign = matchedCampaigns.length ? matchedCampaigns[0] : null;

          return Observable.of(new HttpResponse({ status: 200, body: campaign }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // create campaign
      if (request.url.endsWith('/api/campaigns') && request.method === 'POST') {
        // get new campaign object from post body
        let newcampaign = request.body;

        // validation
        let duplicatecampaign = campaigns.filter(campaign => { return campaign.id === newcampaign.id; }).length;
        if (duplicatecampaign) {
          return Observable.throw('campaignId "' + newcampaign.id + '" is already taken');
        }

        // save new campaign
        newcampaign.id = campaigns.length + 1;
        campaigns.push(newcampaign);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));

        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200 }));
      }

      // delete campaign
      if (request.url.match(/\/api\/campaigns\/\d+$/) && request.method === 'DELETE') {
        // check for fake auth token in header and return campaigns if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find campaigns by id in campaigns array
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < campaigns.length; i++) {
            let campaign = campaigns[i];
            if (campaign.id === id) {
              // delete campaigns
              campaigns.splice(i, 1);
              localStorage.setItem('campaigns', JSON.stringify(campaigns));
              break;
            }
          }

          // respond 200 OK
          return Observable.of(new HttpResponse({ status: 200 }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    })

    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .materialize()
      .delay(500)
      .dematerialize();
  }
  createDb() {
     this.campaigns = [{
      "id": 1036,
      "name": "DEMO CAMPAIGN",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["1"],
      "tiers": ["Default", "Gold", "Silver"],
      "manufacturers": ["Sierra Design Group", "IGT", "Spielo", "Bally", "VLT"],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1035,
      "name": "3rdAugust",
      "description": "Drawing on 6th August 10:01 PM",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["101"],
      "tiers": [],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
    }, {
      "id": 1034,
      "name": "Ankur Bhardwaj",
      "description": "Testing",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["102", "103", "104", "105"],
      "tiers": ["Bronze", "Silver", "Gold"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1033,
      "name": "Ankur Bhardwaj",
      "description": "Testing",
      "rulesFilename": "",
      "prizes": [],
      "groups": [],
      "tiers": [],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1032,
      "name": "2nd_August",
      "description": "2nd_August",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["101"],
      "tiers": [],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1031,
      "name": "1st_Aug_2018",
      "description": "1st_Aug_2018",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["101", "110", "107", "103", "102"],
      "tiers": ["Platinum", "Gold", "Silver", "Bronze"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1030,
      "name": "1st August",
      "description": "1st August",
      "rulesFilename": "",
      "prizes": [],
      "groups": [],
      "tiers": [],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1029,
      "name": "Pilot Campaign",
      "description": "31 july",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["103", "106", "104", "101", "109", "107", "110", "108", "105", "102"],
      "tiers": ["Bronze", "Silver", "Gold", "Platinum"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1028,
      "name": "July_31st",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["109", "108", "103", "107", "104"],
      "tiers": ["Bronze", "Silver", "Gold", "Platinum"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
    }, {
      "id": 1027,
      "name": "ThisIsDemo",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["107", "104", "110", "105", "101", "103", "102", "106", "108"],
      "tiers": ["Bronze", "Silver", "Gold", "Platinum"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
    }, {
      "id": 1026,
      "name": "ThisIsDemo",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["108", "109", "110", "102", "104"],
      "tiers": ["Bronze", "Silver", "Gold", "Platinum"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1025,
      "name": "DEMO CAMPAIGN",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["108", "110", "101", "109", "105"],
      "tiers": ["Bronze", "Silver", "Gold", "Platinum"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
    }, {
      "id": 1023,
      "name": "DEMO CAMPAIGN",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": [],
      "tiers": ["Bronze", "Silver", "Gold", "Platinum"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "4",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1021,
      "name": "Ankur Bhardwaj",
      "description": "Testing",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["106", "107", "105", "109", "104", "110", "102"],
      "tiers": ["Bronze", "Silver"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1019,
      "name": "DEMO CAMPAIGN",
      "description": "Test28July",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["105", "109", "103", "110"],
      "tiers": ["Gold", "Silver", "Platinum", "Bronze"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "3",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1018,
      "name": "Ankur_24_July",
      "description": "Ankur_24_July",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["1", "2"],
      "tiers": ["Gold", "Silver"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 45,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 1017,
      "name": "ThisIsDemo",
      "description": "Test28June",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["1", "2"],
      "tiers": ["Gold", "Silver"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "3",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 6,
      "name": "DEMO CAMPAIGN",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["115", "117"],
      "tiers": ["Gold", "Sapphire"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": false,
      "status": "In Progress"
       
    }, {
      "id": 3,
      "name": "Stuffed toy5",
      "description": "Stuffed toy5",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["123"],
      "tiers": ["Gold", "Silver"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "55",
      "canRollover": true,
      "isArchived": false,
      "isAutoDraw": true,
      "isAutoNotify": true,
      "anticipationDuration": 55,
      "canEdit": true,
      "status": "Scheduled",
       
    }, {
      "id": 2,
      "name": "ThisIsDemo",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["123", "125", "104", "114", "102", "116", "103", "121", "118"],
      "tiers": ["Gold", "Silver"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 60,
      "canEdit": true,
      "status": "Scheduled",
       
    }, {
      "id": 1,
      "name": "DEMO CAMPAIGN",
      "description": "DEMO TEST",
      "rulesFilename": "",
      "prizes": [],
      "groups": ["101"],
      "tiers": ["Gold", "Silver"],
      "manufacturers": [],
      "eligibilityRate": null,
      "rate": "2",
      "canRollover": false,
      "isArchived": false,
      "isAutoDraw": false,
      "isAutoNotify": false,
      "anticipationDuration": 45,
      "canEdit": true,
      "status": "Scheduled",
       
    }];
    this.groups = [{
      "id": "3",
      "name": "Boulder"
    }, {
      "id": "4",
      "name": "Downtown"
    }, {
      "id": "2",
      "name": "Henderson"
    }, {
      "id": "5",
      "name": "Nellis"
    }, {
      "id": "6",
      "name": "RENO"
    }, {
      "id": "7",
      "name": "SpringValley"
    }, {
      "id": "1",
      "name": "Test Group"
    }];
    this.tiers = [{
      "id": "0",
      "name": "Bronze"
    }, {
      "id": "2",
      "name": "Gold"
    }, {
      "id": "3",
      "name": "Platinum"
    }, {
      "id": "1",
      "name": "Silver"
    }];
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};


