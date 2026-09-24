<section class="main-content__section slide-content" id="promo">
	<div class="section-promo _container">
		<div class="section-promo__body">
			<div class="section-promo__video-slide swiper promo-slide">
				<div class="section-promo__video-box">
					<!--*- Видео (основной элемент)  -->
					<video
						class="video-js"
						id="player-id"
						controls
						preload="auto"
						tabindex="-1"
						playsinline
						muted
						src="<?php bloginfo('template_url'); ?>/img/audio/cover.mp4"></video><!--*- Обложка (поверх видео)-->
					<div class="video-cover">
						<div class="video-cover__overlay">
							<div class="video-cover__img">
								<picture>
									<source
										srcset="<?php bloginfo('template_url');
														?>/img/audio/cover.webp"
										type="image/webp" />
									<img src="<?php bloginfo('template_url'); ?>/img/audio/cover.png" alt="image" />
								</picture>
							</div>
						</div>
						<!--*- Кнопка Play (поверх обложки)-->
						<button
							class="video-play-btn"
							type="button"
							aria-label="Запустить видео">
							<span class="video-play-btn__icon"></span>
						</button>
					</div>
					<div class="video-caption">Смотреть шоурил 2025</div>
				</div>
				<div class="section-promo__video-box">
					<!--*- Видео (основной элемент)  -->
					<video
						class="video-js"
						id="player-id"
						controls
						preload="auto"
						tabindex="-1"
						playsinline
						muted
						src="<?php bloginfo('template_url'); ?>/img/audio/cover.mp4"></video>
					<!--*- Обложка (поверх видео)-->
					<div class="video-cover">
						<div class="video-cover__overlay">
							<div class="video-cover__img">
								<picture>
									<source
										srcset="<?php bloginfo('template_url'); ?>/img/audio/cover.webp"
										type="image/webp" />
									<img src="<?php bloginfo('template_url'); ?>/img/audio/cover.png" alt="image" />
								</picture>
							</div>
						</div>
						<!--*- Кнопка Play (поверх обложки)-->
						<button
							class="video-play-btn"
							type="button"
							aria-label="Запустить видео">
							<span class="video-play-btn__icon"></span>
						</button>
					</div>
					<div class="video-caption">Смотреть шоурил 2025</div>
				</div>
			</div>
		</div>
	</div>
</section>