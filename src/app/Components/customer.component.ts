/*** Angular core modules ***/
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

/*** Models ***/ 
import { Customerireferencedto } from '../Models/customerireferencedto';
import { Circuitservicerefdto } from '../Models/circuitservicerefdto';
import { Tripdto } from '../Models/tripdto';
import { Geocordinate } from '../Models/geocordinate';
import { Routefix } from '../Models/routefix';

/*** Services ***/ 
import { Tripservice } from '../Models/tripservice';
import { AppService } from '../app.service';

/*** Azure map module ***/ 
import * as atlas from 'azure-maps-control';
import { AuthenticationType } from 'azure-maps-control';

// declare function loadMap(): void;
// declare function getRings(): void;
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

// -----------------------------------------------

export interface PeriodicElement2 {
  seq: number;
  time: string;
  directive: string;
  waypoint: string;
  remarks: string;
  emb: number;
  deb: number;
  cumuldistance: string;
  totalonboard: number;
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit, AfterViewInit {
 
  isCustomerClicked = false;
  isCircuitList = true;
  isTripList = true;
  isMap = true;
  isItineraryPoint = true;
  private key: any = 'xfX7d36UCgLDsl4KdIIEP6zBF-gzvjW-wIpZKJAnLK8';
  private map: any;
  itineraryArrayLength: number = 0;
  isRouteSheetTable = true;
  isCheckBoxChecked = true;
  checkBoxPopItem = [];

  ringsArray: any = [];
  datasource: any;
  defaultOrder: any;
  routeLine: any;
  allMarker: any = [];
  myLocation: boolean = true;
  markerIndex: number = 0;
  waypointQuery: any;

  constructor(private appservice: AppService) {
  }

  ngAfterViewChecked() {
  }

  displayedColumnsDummy2: string[] = [
    'Seq',
    'Time',
    'Directive',
    'Waypoint',
    'Remarks',
    'Emb',
    'Deb.',
    'Cumul distance',
    'Total onboard',
  ];
  // ------------------------------

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  public customerireferencedto: Customerireferencedto[] = [
    { key: '1', desc: 'Andrew' },
    { key: '2', desc: 'Brendon' },
    { key: '3', desc: 'Chris' },
    { key: '3', desc: 'John' },
    { key: '4', desc: 'Elijah' },
  ];

  public circuitservicerefdto: Circuitservicerefdto[] = [
    { key: '1', desc: 'CIRCUIT LIST 1' },
    { key: '2', desc: 'CIRCUIT LIST 2' },
    { key: '3', desc: 'CIRCUIT LIST 3' },
    { key: '4', desc: 'CIRCUIT LIST 4' },
    { key: '5', desc: 'CIRCUIT LIST 5' },
  ];

  public tripserviceData: Tripservice[] = [
    {
      id: 1,
      routeId: 1,
      tripId: 1,
      circuitServiceId: 1,
      activeFrom: new Date(),
      activeTo: new Date(),
      beginTime: undefined,
      endTime: undefined,
      distance: 4,
      occup: 2,
    },
    {
      id: 2,
      routeId: 2,
      tripId: 1,
      circuitServiceId: 2,
      activeFrom: new Date(),
      activeTo: new Date(),
      beginTime: undefined,
      endTime: undefined,
      distance: 4,
      occup: 2,
    },
    {
      id: 3,
      routeId: 3,
      tripId: 1,
      circuitServiceId: 3,
      activeFrom: new Date(),
      activeTo: new Date(),
      beginTime: undefined,
      endTime: undefined,
      distance: 4,
      occup: 2,
    },
    {
      id: 4,
      routeId: 4,
      tripId: 1,
      circuitServiceId: 4,
      activeFrom: new Date(),
      activeTo: new Date(),
      beginTime: undefined,
      endTime: undefined,
      distance: 4,
      occup: 2,
    },
  ];

  public tripdto: Tripdto[] = [
    {
      id: 1,
      circuitId: 1,
      externalRef: 'description 1',
      locationStartId: 1,
      locationEndId: 1,
    },
    {
      id: 2,
      circuitId: 2,
      externalRef: 'description 2',
      locationStartId: 2,
      locationEndId: 2,
    },
    {
      id: 3,
      circuitId: 3,
      externalRef: 'description 3',
      locationStartId: 3,
      locationEndId: 3,
    },
    {
      id: 4,
      circuitId: 4,
      externalRef: 'description 4',
      locationStartId: 4,
      locationEndId: 4,
    },
  ];

  public geocordinate: Geocordinate[] = [
    { seq: 1, lon: 73.45443, lat: 45.345546 },
    { seq: 2, lon: 73.45443, lat: 45.345546 },
    { seq: 3, lon: 73.45443, lat: 45.345546 },
    { seq: 4, lon: 73.45443, lat: 45.345546 },
    { seq: 5, lon: 73.45443, lat: 45.345546 },
  ];

  routefixHeader: string[] = [
    'Seq',
    'Time',
    'Directive',
    'Waypoint',
    'Remarks',
    'Emb',
    'Deb.',
    'Cumul distance',
    'Total onboard',
  ];
  public routefix: Routefix[] = [
    {
      id: undefined,
      seq: 1,
      lont: 1,
      isWpLeg: false,
      distance: 4,
      routeId: 1,
      wpTime: '12:00 AM',
      directive: ['Start'],
      waypoint: 'Garage',
      remarks: 'Attention À la barrière',
      locationMaincords: 1,
      locationRadius: 1,
      locationAeraGeo: [1, 2, 3],
      locationRef: '',
      locationType: '',
      paxIn: ['test1', 'test2'],
      paxOut: ['test1', 'test2'],
      emb: 2,
      deb: 2,
      cumuldistance: '1.Km',
      totalonboard: 1,
    },
    {
      id: undefined,
      seq: 2,
      lont: 2,
      isWpLeg: false,
      distance: 4,
      routeId: 1,
      wpTime: '12:00 AM',
      directive: ['Start'],
      waypoint: 'Garage',
      remarks: 'Attention À la barrière',
      locationMaincords: 1,
      locationRadius: 1,
      locationAeraGeo: [1, 2, 3],
      locationRef: '',
      locationType: '',
      paxIn: ['test1', 'test2'],
      paxOut: ['test1', 'test2'],
      emb: 2,
      deb: 2,
      cumuldistance: '1.Km',
      totalonboard: 1,
    },
    {
      id: undefined,
      seq: 3,
      lont: 3,
      isWpLeg: false,
      distance: 4,
      routeId: 1,
      wpTime: '12:00 AM',
      directive: ['Start'],
      waypoint: 'Garage',
      remarks: 'Attention À la barrière',
      locationMaincords: 1,
      locationRadius: 1,
      locationAeraGeo: [1, 2, 3],
      locationRef: '',
      locationType: '',
      paxIn: ['test1', 'test2'],
      paxOut: ['test1', 'test2'],
      emb: 2,
      deb: 2,
      cumuldistance: '1.Km',
      totalonboard: 1,
    },
  ];

  ngOnInit(): void {}

  
  ngAfterViewInit():void {
    //Initialize a map instance.
    this.map = new atlas.Map('myMap', {
      center: [-122.216217, 47.619383],
      zoom: 9,
      view: 'Auto',
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: this.key,
      },
    });

    this.map.events.add('click', (e) => {
        this.ringsArray.push(e.position);
        this.markerIndex = this.markerIndex + 1;
        var marker = new atlas.HtmlMarker({
          color: 'blue',
          text: this.markerIndex.toString(),
          position: e.position,
          popup: new atlas.Popup({
            content: '<div style="padding:10px">' + e.position + '</div>',
            pixelOffset: [0, -30],
          }),
        });
        this.map.markers.add(marker);
        this.allMarker.push(marker);
    });

    //map resources are ready.
    this.map.events.add('ready', (e) => {
      this.datasource = new atlas.source.DataSource();
      this.map.sources.add(this.datasource);
      //Add layers from rendering data in the data source.
      this.map.layers.add([
        //Render linestring data using a line layer.
        new atlas.layer.LineLayer(this.datasource, null, {
          strokeColor: 'blue',
          strokeWidth: 5,
        }),
        //Render point data using a symbol layer.
        new atlas.layer.SymbolLayer(this.datasource, null, {
          textOptions: {
            textField: ['get', 'title'],
            offset: [0, -1.2],
            color: 'white',
          },
          filter: [
            'any',
            ['==', ['geometry-type'], 'Point'],
            ['==', ['geometry-type'], 'MultiPoint'],
          ], //Only render Point or MultiPoints in this layer.
        }),
      ]);
     });
  }

  public onCustomerClicked() {
    this.isCustomerClicked = true;
    this.isCircuitList = false;   
  }

 public onCircuitClicked() {
    this.isTripList = false;
  }

  public clearArray(): any {
    this.routefix = null;
    this.routefix = null;
    this.isRouteSheetTable = false;
  }

  /// Reset legs and remove marker
  public resetLegs() {
    this.ringsArray = [];
    this.routefix = [];
    this.markerIndex = 0;
    this.allMarker.forEach((e) => {
      this.map.markers.remove(e);
    });

    if (this.routeLine) {      
      this.datasource.remove(this.routeLine);
      this.routeLine = null;
    }
  }

  /// Add route to list
  public addRoute() {
    this.routefix = [];
    if (this.ringsArray.length > 1) {
      for (let index = 0; index < this.ringsArray.length - 1; index++) {
        this.routefix.push({
          id: undefined,
          seq: 1,
          lont: 1,
          isWpLeg: false,
          distance: 4,
          routeId: 1,
          wpTime: '12:00 AM',
          directive: ['Start'],
          waypoint: 'Garage',
          remarks: 'Attention À la barrière',
          locationMaincords: 1,
          locationRadius: 1,
          locationAeraGeo: [1, 2, 3],
          locationRef: '',
          locationType: '',
          paxIn: ['test1', 'test2'],
          paxOut: ['test1', 'test2'],
          emb: 2,
          deb: 2,
          cumuldistance: '1.Km',
          totalonboard: 1,
        });
        this.routefix = this.routefix.slice();
      }
    } else {
      this.routefix = [];
    }

    this.calculateRoute();
  }

  /// Add or remove first itenary from array
  public checkBoxEventChange() {
    if (this.myLocation == false) {
      this.checkBoxPopItem = this.ringsArray.shift();
      console.log(this.checkBoxPopItem);
      this.isCheckBoxChecked = !this.isCheckBoxChecked;

      this.map.markers.remove(this.allMarker[0]);
    } else {
      this.map.markers.add(this.allMarker[0]);
      this.ringsArray.unshift(this.checkBoxPopItem);
    }  
  
    // this.allMarker.forEach((e) => {
      
    // });

    this.addRoute();
  }

  /// Calcualte Route
  private calculateRoute() {
      var query = [];
      this.defaultOrder = [];
      for (var i = 0; i < this.ringsArray.length; i++) {
        query.push(this.ringsArray[i][1] + ',' + this.ringsArray[i][0]);
        this.defaultOrder.push(i);
      }
      this.waypointQuery = query.join(':');
      this.waypointQuery.replace(' ', '');

      var requestUrl =
        'https://atlas.microsoft.com/route/directions/json?api-version=1&subscription-key=xfX7d36UCgLDsl4KdIIEP6zBF-gzvjW-wIpZKJAnLK8&query=' +
        this.waypointQuery +
        '&routeRepresentation=polyline&travelMode=car&view=Auto&computeBestOrder=true';
        
      var dataSource = new atlas.source.DataSource();
      this.map.sources.add(dataSource);
      this.appservice.get(requestUrl).subscribe((res) => {
        if (res) {
          this.drawRoute(res.routes[0]);
        }
      });
  }

/// Draw itenary route  
  private drawRoute(route) {
    var routeCoordinates = [];
    if (this.routeLine) {     
      this.datasource.remove(this.routeLine);
      this.routeLine = null;
    }
    for (var legIndex = 0; legIndex < route.legs.length; legIndex++) {
      var leg = route.legs[legIndex];
      var legCoordinates = leg.points.map(function (point) {
        return [point.longitude, point.latitude];
      });
      //Combine the route point data for each route leg together to form a single path.
      routeCoordinates = routeCoordinates.concat(legCoordinates);
    }
    console.log(routeCoordinates);
    const dataSource = new atlas.source.DataSource();
    this.map.sources.add(dataSource);
    //Create a LineString from the route path points and add it to the data source.
    this.routeLine = new atlas.Shape(
      new atlas.data.LineString(routeCoordinates)
    );
    this.datasource.add(this.routeLine);
  }


}
