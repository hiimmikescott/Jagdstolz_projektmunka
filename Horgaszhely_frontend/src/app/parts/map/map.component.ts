
class CustomMarker extends L.Marker {
  spot: Fishingspot;

  constructor(latlng: L.LatLngExpression, options?: L.MarkerOptions & { spot: Fishingspot }) {
    super(latlng, options);
    this.spot = options?.spot!;
  }
}

const reservable = L.icon({
  iconUrl: '../../../assets/images/marker.png',
  iconSize: [30, 50],
  iconAnchor: [1, 32],
  popupAnchor: [0, -32],
});

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { FishingSpotService, Fishingspot } from '../../services/fishing-spot.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [FishingSpotService],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  markers: CustomMarker[] = [];
  selectedSpot: Fishingspot | null = null;

  constructor(private fishingSpotService: FishingSpotService, private router: Router) { }

  ngOnInit() {
    this.fishingSpotService.getFishingSpots().subscribe({
      next: (response) => {
        const fishingSpots = response.data;

        this.markers = fishingSpots.map(
          (spot: any) => new CustomMarker([spot.latitude, spot.longitude], { spot, icon: reservable })
        );
        this.initializeMap();
        this.addMarkers();
        this.centerMap();
      },
      error: (error) => {
        console.error('Error fetching fishing spots:', error);
      },
    });
  }


  closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.dispose();
    }
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map', {
      center: [47.536209, 19.570936],
      zoom: 10,
    });

    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private addMarkers() {
    this.markers.forEach((marker) => {
      marker.addTo(this.map);
      marker.on('click', () => {
        this.selectedSpot = marker.spot;
        console.log('Marker clicked. Spot:', this.selectedSpot);
        const modal = document.getElementById('customModal');
        if (modal) {
          const bootstrapModal = new bootstrap.Modal(modal);
          bootstrapModal.show();
        }
      });
    });
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map((marker) => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }

  protected trueOrFalse(data: boolean | undefined) {
    if (data == true) {
      return "Van";
    }
    return "Nincs";
  }
  navigate(){
    this.router.navigate(['/bookform'], {
      queryParams: {
        id: this.selectedSpot!.id,
        reservable: !!this.selectedSpot!.reservable
      }
    });
  }
}
