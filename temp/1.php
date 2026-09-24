<?php
$promo_slides = get_field('video_promo');

if ($promo_slides) :
?>

	<section class="main-content__section slide-content" id="promo">
		<div class="section-promo _container">
			<div class="section-promo__body">

				<div class="section-promo__video-slide swiper promo-slide">

					<?php foreach ($promo_slides as $slide) :

						$video   = $slide['video'] ?? null;
						$image   = $slide['image'] ?? null;
						$caption = $slide['caption'] ?? '';

						if (!$video) {
							continue;
						}

						$video_url = is_array($video)
							? ($video['url'] ?? '')
							: wp_get_attachment_url($video);

						$image_url = is_array($image)
							? ($image['url'] ?? '')
							: wp_get_attachment_image_url($image, 'full');

						$image_alt = is_array($image)
							? ($image['alt'] ?? '')
							: '';
					?>

						<div class="section-promo__video-box">

							<video
								class="video-js"
								controls
								preload="auto"
								tabindex="-1"
								playsinline
								muted
								src="<?php echo esc_url($video_url); ?>">
							</video>

							<?php if ($image_url) : ?>
								<div class="video-cover">
									<div class="video-cover__overlay">
										<div class="video-cover__img">
											<img
												src="<?php echo esc_url($image_url); ?>"
												alt="<?php echo esc_attr($image_alt); ?>">
										</div>
									</div>

									<button
										class="video-play-btn"
										type="button"
										aria-label="Запустить видео">
										<span class="video-play-btn__icon"></span>
									</button>
								</div>
							<?php endif; ?>

							<?php if ($caption) : ?>
								<div class="video-caption">
									<?php echo esc_html($caption); ?>
								</div>
							<?php endif; ?>

						</div>

					<?php endforeach; ?>

				</div>

			</div>
		</div>
	</section>

<?php endif; ?>