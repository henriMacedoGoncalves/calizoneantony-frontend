import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EbookService } from '../../services/ebook.service';
import { Ebook } from '../../common/ebook';

@Component({
  selector: 'app-ebook-details',
  imports: [RouterModule],
  templateUrl: './ebook-details.component.html',
  styleUrl: './ebook-details.component.css',
})
export class EbookDetailsComponent implements OnInit {
  ebook: Ebook = new Ebook();

  constructor(
    private route: ActivatedRoute,
    private ebookService: EbookService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleEbookDetails();
    });
  }

  handleEbookDetails() {
    const ebookId: number = +this.route.snapshot.paramMap.get('id')!;

    this.ebookService.getEbook(ebookId).subscribe((data) => {
      this.ebook = data;
    });
  }
}
