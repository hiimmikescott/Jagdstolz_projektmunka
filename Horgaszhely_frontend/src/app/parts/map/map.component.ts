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
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { FishingSpotService, FishingSpot } from '../../services/fishing-spot.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [FishingSpotService],
})
export class MapComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCarousel();
    }, 1000);
  }

  private initializeCarousel() {
    const carousel = document.getElementById('imageCarousel');
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
    L.control.zoom().addTo(this.map);
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
          <div id="carouselExample" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              ${this.selectedSpot.images
            .map((image, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${image}" class="d-block w-100" alt="Image ${index + 1}">
                  </div>
                `)
            .join('')}
            </div>
            <a class="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExample" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <ul>
            <li>Reservable: ${this.selectedSpot.reservable}</li>
            <li>Pier: ${this.selectedSpot.pier}</li>
            <li>Firepit: ${this.selectedSpot.firepit}</li>
            <li>Shelter: ${this.selectedSpot.shelter}</li>
            <li>Average Rating: ${this.selectedSpot.averageRating}</li>
          </ul>
        `;
      }

      const modal = new bootstrap.Modal(document.getElementById('customModal')!);
      modal.show();
    }
  }
}
