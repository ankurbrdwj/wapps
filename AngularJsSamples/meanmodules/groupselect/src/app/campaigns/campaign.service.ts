import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpResponse } from "@angular/common/http";
import { IUploadOptions } from '@covalent/core';
import { Observable } from 'rxjs/Rx';
import { Campaign, Group, Tier, EligibilityRate,Prize } from './campaign';

@Injectable()
export class CampaignService {
  private _baseUrl: string;
  private _token: string;

  set BaseUrl(url: string) {
    this._baseUrl = url;
  }

  set Token(data: string) {
    this._token = data;
  }
  private camapaignsUrl  = 'app/campaigns';
  private groupsUrl  = 'app/groups';
  private tiersUrl  = 'app/tiers';
  constructor(protected httpClient: HttpClient) {

  }

  getAll(archive: boolean = false): Observable<Campaign[]> {
    let flag = archive ? '?isarchived=true' : '';
    let campaigns$ = this.httpClient
      .get(`${this.camapaignsUrl}`, { headers: this.getHeaders() })
      .map(mapCampaigns)
      .catch(handleError);
    return campaigns$;
  }

  get(id: string): Observable<Campaign> {
    let campaign$ = this.httpClient
      .get(`${this._baseUrl}/campaigns/${id}`, { headers:  this.getHeaders() })
      .map(mapCampaign)
      .catch(handleError);
    return campaign$;
  }

  create(campaign: Campaign): Observable<Campaign> {
    let req = {
      campaign: campaign
    }

    let campaign$;
    campaign$ = this.httpClient
      .post(`${this._baseUrl}/campaigns`, JSON.stringify(req), { headers: this.getHeaders() })
      .map(mapCampaign)
      .catch(handleError);
    return campaign$;
  }

  save(campaign: Campaign): Observable<Campaign> {
    let req = {
      campaign: campaign
    }

    let campaign$;
    campaign$ = this.httpClient
      .put(`${this._baseUrl}/campaigns`, JSON.stringify(req), { headers: this.getHeaders() })
      .map(mapCampaign)
      .catch(handleError);
    return campaign$;
  }

  archive(id: string, isArchived: boolean = true) {
    let req = {
      isArchived: isArchived
    }

    let res$ = this.httpClient
      .patch<Campaign>(`${this._baseUrl}/campaigns/${id}`, JSON.stringify(req), { headers: this.getHeaders() })
      .catch(handleError);
    return res$;
  }

  groups() {
    let groups$ = this.httpClient
      .get(`${this.groupsUrl}`, { headers: this.getHeaders() })
      .map(mapGroups)
      .catch(handleError);
    return groups$;
  }

  tiers() {
    let tiers$ = this.httpClient
      .get(`${this.tiersUrl}`, {headers: this.getHeaders()})
      .map(mapTiers)
      .catch(handleError);
    return tiers$;
  }

  uploadOptions(id: string, file: File) {
    let options: IUploadOptions = {
      url: `${this._baseUrl}/campaigns/${id}/upload`,
      method: 'post',
      headers: { Accept: 'application/json' },
      file: file
    };
    if (this._token) options.headers.Authorization = 'Bearer ' + this._token;

    return options;
  }

  getRulesDownloadUrl(id: string): string {
    return `${this._baseUrl}/campaigns/${id}/download`;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    if (this._token) headers.append('Authorization', 'Bearer ' + this._token);
    return headers;
  }
}

function mapCampaigns(response: HttpResponse<Campaign[]>): Campaign[] {

  let data = response.body;
  if (!data) {
    return [];
  }

  return data.map(toCampaign);
}

function mapCampaign(response: HttpResponse<Campaign>): Campaign {

  return toCampaign(response.body);
}

function mapPrizes(prizes: any): Prize[] {

  return prizes ? prizes.map(toPrize) : [];
}

function mapGroups(response: HttpResponse<Group[]>): Group[] {
  let data = response.body;
  return data ? data.map(toGroup) : [];
}

function mapTiers(response: HttpResponse<Tier[]>): Tier[] {

  let data = response.body;
  return data ? data.map(toTier) : [];
}

function mapEligibilityRates(eligibilityRates: any): EligibilityRate[] {

  return eligibilityRates ? eligibilityRates.map(toEligibilityRate) : [];
}

function toCampaign(r: any): Campaign {
  let isCampaignComplete = false;
  if (r.status === 'Completed') {
    isCampaignComplete = true;
  }
  let campaign = <Campaign>({
    id: r.id,
    name: r.name,
    description: r.description,
    rulesFilename: r.rulesFilename,
    prizes: mapPrizes(r.prizes),
    groups: r.groups,
    tiers: r.tiers,
    manufacturers: r.manufacturers,
    rate: r.rate,
    eligibilityRate: mapEligibilityRates(r.eligibilityRate),
    canRollover: r.canRollover,
    isArchived: r.isArchived,
    isAutoDraw: r.isAutoDraw,
    isAutoNotify: r.isAutoNotify,
    anticipationDuration: r.anticipationDuration,
    canEdit: r.canEdit,
    status: r.status,
    isComplete: isCampaignComplete
  });
  return campaign;
}

function toPrize(r: any): Prize {
  let prize = <Prize>({
    name: r.name,
    value: r.value,
    rolloverType: r.rolloverType,
    rolloverValue: r.rolloverValue
  });
  return prize;
}

function toGroup(r: any): Group {
  let group = <Group>({
    id: r.id,
    name: r.name
  });
  return group;
}

function toTier(r: any): Tier {
  let tier = <Tier>({
    id: r.id,
    name: r.name
  });
  return tier;
}

function toEligibilityRate(r: any):EligibilityRate {
  let er = <EligibilityRate>({
    id: r.id,
    type: r.type,
    rate: r.rate,
    name: r.name
  });
  return er;
}

function handleError(response: HttpResponse<any>) {
  let error = response.body|| {};
  if (error.type) {
    return Observable.throw(error.type);
  } else {
    error = JSON.parse(response.body);
  }

  let errMsg = (error.err) ? error.err :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  return Observable.throw(errMsg);
}
