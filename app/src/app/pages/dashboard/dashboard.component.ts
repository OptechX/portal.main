import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  newsUpdates: any = [];
  billingType:any;
  appLockerStorageUsed: any;
  appLockerStorageAvailable: any;
  imagesRemaining: any;
  accountTier: any;
  lastFiveNews:any;
  buildHistory:any;
  user: any;

  toggleProBanner(event) {
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }

  constructor(
    private dashboardService: DashboardService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.getNewsUpdates();
    this.getAccountById(this.user.id);
    this.getBuildHistroy(this.user.id);
    this.getLast5News();
  }

  date: Date = new Date();

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'USA',
    data: [40, 30, 20, 10, 50, 15, 35, 40],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'UK',
    data: [70, 10, 30, 40, 25, 50, 15, 30],
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 20,
                max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
        }],
        xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
            },
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

  getNewsUpdates(){
    this.dashboardService.getNewsUpdates().subscribe((res: any) => {
      this.newsUpdates = res;
    })
  }
  
  getAccountById(id) {
    this.dashboardService.getAcoountsById(id).subscribe((res:any) =>{
       this.imagesRemaining = res.imagesRemaining;
       this.accountTier = res.accountTier;
       this.billingType = res.billingType;
    })
  }

  getLast5News() {
    this.dashboardService.getLast5News().subscribe((res:any) =>{
      this.lastFiveNews = res;
    })
  }

  getBuildHistroy(accountId) {
    this.dashboardService.getBuildHistroy(accountId).subscribe((res:any) =>{
      this.buildHistory = res;
    })
  }
}
