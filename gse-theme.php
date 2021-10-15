<?php
namespace Grav\Theme;

use Grav\Common\Theme;

class GSETheme extends Theme
{
    public static function getSubscribedEvents()
    {
        return [
            'onTwigExtensions' => ['onTwigExtensions', 0]
        ];
    }

    public function onTwigExtensions()
    {
       $function = new \Twig_SimpleFunction ('buildTaxonomy', function ($data) {

          if(!isset($data)) return "";

          $result = "";
          
          foreach ($data as $taxonomy => $values) {
           $result = $result . "/" . $taxonomy . ":" . implode($values, ',');
          }


        return $result;
       });
       
       
       $this->grav['twig']->twig->addFunction($function);        
    }
}
