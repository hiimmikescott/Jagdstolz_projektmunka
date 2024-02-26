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

  constructor(private fishingSpotService: FishingSpotService) { }

  ngOnInit() {
    this.fishingSpotService.getFishingSpots().subscribe(
      (response) => {
        const fishingSpots = response.data; // Assuming the fishing spots are under the 'data' key

        this.markers = fishingSpots.map(
          (spot: any) => new CustomMarker([spot.latitude, spot.longitude], { spot, icon: reservable })
        );

        this.initializeMap();
        this.addMarkers();
        this.centerMap();
        //console.log(response)
      },
      (error) => {
        console.error('Error fetching fishing spots:', error);
      }
    );
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
        //console.log("marker clicked. marker: ",marker.spot)
        //if(this.selectedSpot){
          this.selectedSpot=marker.spot
          console.log("marker clicked. marker: ",marker.spot)
          this.openCustomModal()
          marker.openPopup()
        //}
      });
    });
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map((marker) => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }

  private openCustomModal() {
    if (this.selectedSpot) {
      const modalTitle = document.getElementById('customModalLabel');
      const modalBody = document.querySelector('.modal-body');

      if (modalTitle && modalBody) {
        modalTitle.textContent = this.selectedSpot.id.toString();

        modalBody.innerHTML = `
          <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${this.selectedSpot.images
            .map((image, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${image}" class="d-block w-100" alt="Kép ${index + 1}" style="height: 400px; width: 800px;">
                  </div>
                `)
            .join('')}
            </div>
            <a class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only"></span>
            </a>
            <a class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only"></span>
            </a>
          </div>
          <ul>
            <li>Stég: ${this.selectedSpot.pier}</li>
            <li>Tűzrakóhely: ${this.selectedSpot.firepit}</li>
            <li>Beálló: ${this.selectedSpot.shelter}</li>
            <li>Értékelés: ${this.selectedSpot.averageRating}</li>
          </ul>
        `;
      }

      const modal = new bootstrap.Modal(document.getElementById('customModal')!);
      modal.show();
    }
  }
}
