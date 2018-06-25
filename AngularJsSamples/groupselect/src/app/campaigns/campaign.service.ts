import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IUploadOptions } from '@covalent/core';
import { Observable } from 'rxjs/Rx';
import {Campaign, Group, Tier, EligibilityRate, Prize} from './campaign';

@Injectable()
export class CampaignService {
  private _baseUrl: string;
  private _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  set BaseUrl(url: string) {
    this._baseUrl = url;
  }

  set Token(data: string) {
    this._token = data;
  }

  constructor(private http: Http) {
  }

  getAll(archive: boolean = false): Observable<Campaign[]> {
    let flag = archive ? '?isarchived=true' : '';
    let campaigns$ = this.http
      .get(`/assets/data/campaigns.json`, {headers: this.getHeaders()})
      .map(mapCampaigns)
      .catch(handleError);
    return campaigns$;
  }

  get(id: string): Observable<Campaign> {
    let campaign$ = this.http
      .get(`/assets/data/campaign.json`, {headers: this.getHeaders()})
      .map(mapCampaign)
      .catch(handleError);
    return campaign$;
  }

 /* create(campaign: Campaign): Observable<Campaign> {
    let req = {
      campaign: campaign
    }

    let campaign$;
    campaign$ = this.http
      .post(`${this._baseUrl}/campaigns`, JSON.stringify(req), {headers: this.getHeaders()})
      .map(mapCampaign)
      .catch(handleError);
    return campaign$;
  }

  save(campaign: Campaign): Observable<Campaign> {
    let req = {
      campaign: campaign
    }

    let campaign$;
    campaign$ = this.http
      .put(`${this._baseUrl}/campaigns`, JSON.stringify(req), {headers: this.getHeaders()})
      .map(mapCampaign)
      .catch(handleError);
    return campaign$;
  }

  archive(id: string, isArchived: boolean = true) {
    let req = {
      isArchived: isArchived
    }

    let res$ = this.http
      .patch(`${this._baseUrl}/campaigns/${id}`, JSON.stringify(req), {headers: this.getHeaders()})
      .map((res: Response) => res.json())
      .catch(handleError);
    return res$;
  }*/

  groups() {
    let groups$ = this.http
      .get(`/assets/data/groups.json`, {headers: this.getHeaders()})
      .map(mapGroups)
      .catch(handleError);
    return groups$;
  }

  tiers() {
    let tiers$ = this.http
      .get(`/assets/data/tiers.json`, {headers: this.getHeaders()})
      .map(mapTiers)
      .catch(handleError);
    return tiers$;
  }

/*
    uploadOptions(id: string, file: File) {
        let options: IUploadOptions = {
            url: `${this._baseUrl}/campaigns/${id}/upload`,
            method: 'post',
            headers: { Accept: 'application/json' },
            file: filesssss
        };
        if (this._token) options.headers.Authorization = 'Bearer ' + this._token;

        return options;
    }
*/

 /*   getRulesDownloadUrl(id: string): string {
        return `${this._baseUrl}/campaigns/${id}/download`;
    }*/

    getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        if (this._token) {
          headers.append('Authorization', 'Bearer ' + this._token);
        }
        return headers;
    }
}

function  mapCampaigns(response: Response): Campaign[] {

    let data = response.json();
    if (!data.campaigns) {
        return [];
    }

    return data.campaigns.map(toCampaign);
}

function  mapCampaign(response: Response): Campaign {

    return toCampaign(response.json().campaign);
}

function mapPrizes(prizes: any): Prize[] {

    return prizes ? prizes.map(toPrize) : [];
}

function mapGroups(response: Response): Group[] {
    let data = response.json();
    return data.groups ? data.groups.map(toGroup) : [];
}
function mapTiers(response: Response): Tier[] {

  let data = response.json();
  return data.tiers ? data.tiers.map(toTier) : [];
}
function mapEligibilityRates(eligibilityRates: any): EligibilityRate[] {

  return eligibilityRates ? eligibilityRates.map(toEligibilityRate) : [];
}
function toCampaign(r: any): Campaign {
    let campaign = <Campaign>({
        id: r.id,
        name: r.name,
        description: r.description,
        rulesFilename: r.rulesFilename,
        prizes: mapPrizes(r.prizes),
        groups: r.groups,
        tiers: r.tiers,
        rate: r.rate,
        eligibilityRate: mapEligibilityRates(r.eligibilityRate),
        canRollover: r.canRollover,
        isArchived: r.isArchived,
        isAutoDraw: r.isAutoDraw,
        isAutoNotify: r.isAutoNotify,
        anticipationDuration: r.anticipationDuration,
        canEdit: r.canEdit
    });
    console.log('Parsed campaign:', campaign);
    return campaign;
}

function toPrize(r: any): Prize {
    let prize = <Prize>({
        name: r.name,
        value: r.value,
        rolloverType: r.rolloverType,
        rolloverValue: r.rolloverValue
    });
    console.log('Parsed prize:', prize);
    return prize;
}

function toGroup(r: any): Group {
    let group = <Group>({
        id: r.id,
        name: r.name
    });
    console.log('Parsed group: ', group);
    return group;
}
function toTier(r: any): Tier {
  let tier = <Tier>({
    id: r.id,
    name: r.name
  });
  console.log('Parsed tier: ', tier);
  return tier;
}
function toEligibilityRate(r: any): EligibilityRate {
  let er = <EligibilityRate>({
    id: r.id,
    name: r.name,
    type: r.name,
    rate: r.rate
  });
  console.log('Parsed eligibility: ', er);
  return er;
}
function handleError(response: any) {
    let error = response._body || {};
    if (error.type) {
        return Observable.throw(error.type);
    } else {
        error = JSON.parse(response._body);
    }

    let errMsg = (error.err) ? error.err :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
}
