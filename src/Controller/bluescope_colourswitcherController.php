<?php

namespace Drupal\bluescope_colourswitcher\Controller;

use Drupal\Core\Controller\ControllerBase;

class bluescope_colourswitcherController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function content() {
    $build = array(
      '#theme' => 'colourscheme',
    );
    return $build;
  }

}