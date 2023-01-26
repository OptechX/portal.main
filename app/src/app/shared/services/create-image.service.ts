import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateImageService {
  _headers: HttpHeaders
  constructor(private httpClient: HttpClient) { }

  getRelease() {
    return this.httpClient.get(`${environment.BASE_URL}v1/WinRefCore01Release`);
  }

  getEdition(release: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/WinRefCore02Edition/${release}`);
  }

  getVersion(release: string, edition: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/WinRefCore03Version/${release}/${edition}`);
  }

  getArch(release: string, edition: string, version: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/WinRefCore04Arch/${release}/${edition}/${version}`);
  }

  getLanguage(release: string, edition: string, version: string, arch: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/WinRefCore05Language/${release}/${edition}/${version}/${arch}`);
  }

  getWindowsOptionsFeature(version: string, edition: string, release: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/WindowsOptionalFeature/multisearch/${version}/${edition}/${release}`);
  }

  getAppxProvisionedPackage(version: string, edition: string, release: string, arch: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/AppxProvisionedPackage/multiarchsearch/${version}/${edition}/${release}/${arch}`);
  }

  getApplicationsFromArch(arch: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/application/arch/${arch}`);
  }

  getDriversData(windowsOs: string, arch: string) {
    return this.httpClient.get(`${environment.BASE_URL}v1/driverscore/page4/${windowsOs}/${arch}`);
  }

   createNewOrder(orderDetailsObj: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
        'Content-encoding': 'charset=utf-8'
      }),
      responseType: "text" as "json",
    };
    return this.httpClient.post(`${environment.BASE_URL}v1 /OrderManagement`, orderDetailsObj,httpOptions)
    
  }
}
