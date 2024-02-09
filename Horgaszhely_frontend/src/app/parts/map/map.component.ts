class CustomMarker extends L.Marker {
  spot: FishingSpot;

  constructor(latlng: L.LatLngExpression, options?: L.MarkerOptions & { spot: FishingSpot }) {
    super(latlng, options);
    this.spot = options?.spot!;
  }
}

const customIcon = L.icon({
  iconUrl: '../../../assets/images/marker.png',
  iconSize: [30, 50],
  iconAnchor: [1, 32],
  popupAnchor: [0, -32],
});

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { FishingSpotService, FishingSpot } from '../../services/fishing-spot.service';
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
  selectedSpot: FishingSpot | null = null;

  constructor(private fishingSpotService: FishingSpotService) { }

  ngOnInit() {
    this.fishingSpotService.getFishingSpots().subscribe((fishingSpots) => {
      this.markers = fishingSpots.map((spot) =>
        new CustomMarker([spot.latitude, spot.longitude], { spot, icon: customIcon })
      );

      this.initializeMap();
      this.addMarkers();
      this.centerMap();
      
    });
  }


  private initializeCarousel() {
    const carousel = document.getElementById('carouselExampleAutoplaying');
    if (carousel) {
      new bootstrap.Carousel(carousel, {
        interval: 1000,
      });
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
        this.openCustomModal();
        marker.openPopup();
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
        modalTitle.textContent = this.selectedSpot.description;

        modalBody.innerHTML = `
          <div id="carouselExampleAutoplaying" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              ${this.selectedSpot.images
            .map((image, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${image}" class="d-block w-100" alt="Image ${index + 1}" style="height: 400px; width: 800px;">
                  </div>
                `)
            .join('')}
            </div>
            <a class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only"></span>
            </a>
            <a class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
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
