import { Component, OnInit } from '@angular/core';
import { EbookService } from '../../services/ebook.service';
import { Ebook } from '../../common/ebook';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-ebooks',
  imports: [CommonModule, RouterModule],
  templateUrl: './ebooks.component.html',
  styleUrl: './ebooks.component.css',
})
export class EbooksComponent implements OnInit {
  ebooks!: Ebook[];

  constructor(
    private ebookService: EbookService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listEbooks();
    });
  }

  listEbooks() {
    this.ebookService.getEbooks().subscribe((data) => {
      //console.log('Ebooks=' + JSON.stringify(data));
      this.ebooks = data;
    });
  }

  addToCart(ebook: Ebook) {
    const cartItem = new CartItem(
      ebook.id,
      ebook.title,
      ebook.folderPath,
      ebook.price
    );

    this.cartService.addToCart(cartItem);
  }
}
