import { Component, OnInit } from '@angular/core';
import { DriverLibraryService } from 'src/app/shared/services/driver-library.service';

@Component({
  selector: 'app-driver-library',
  templateUrl: './driver-library.component.html',
  styleUrls: ['./driver-library.component.scss']
})
export class DriverLibraryComponent implements OnInit {
  driversDetails: any = [];
  page = 1;
  pageSize = 3;
  collectionSize = 0;
  paginateData: any = [];
   oemArray = []
     constructor(private driverService: DriverLibraryService) { }

  ngOnInit(): void {
    this.getAllDrivers();
    setTimeout(() => {
      this.collectionSize = this.driversDetails.length;
      this.getPremiumData();
    }, 400);
  }

  getAllDrivers() {
    this.driverService.getdrivers().subscribe(res =>{
      this.driversDetails = res  
    })
  }

  getPremiumData(){
    this.paginateData =  this.driversDetails
     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
     
   }


  onChangeOfOem(value){
    if(value == 0){
      this.getAllDrivers();
  }else {
      this.driverService.getdriversByOem(value).subscribe(res =>{
        this.driversDetails = res;
      })
    }
   }

  onChangeOfCpu(value){
    if(value == 0){
      this.getAllDrivers();
  }else {
    this.driverService.getdriversBycpuArch(value).subscribe(res =>{
      this.driversDetails = res;  
    })
  }
  }

  onChangeOfWindows(value){
    if(value == 0){
      this.getAllDrivers();
  }else {
    this.driverService.getdriversByWindowsOs(value).subscribe(res =>{
      this.driversDetails = res; 
    })
  }
  }

  onSearch(value){
    if(value === ''){
      this.getAllDrivers();
  }else {
    this.driverService.searchDrivers(value).subscribe(res =>{
      this.driversDetails = res; 
    })
  }
  }

  onSearchClean(key) {
    if(key === ' ') {
      this.getAllDrivers();
    }
  }
}
