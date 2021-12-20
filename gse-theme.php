<?php
namespace Grav\Theme;

use Grav\Common\Theme;
use RocketTheme\Toolbox\Event\Event;

class GSETheme extends Theme
{
    public static function getSubscribedEvents()
    {
        return [
            'onTwigExtensions' => ['onTwigExtensions', 0],
            'onCollectionProcessed' => ['onCollectionProcessed', 10]
            
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
    
    public function onCollectionProcessed(Event $event): void 
    {
        /** @var Collection $collection */
        $collection = $event['collection'];

    $this->grav['debugger']->addMessage($collection->params());

        $use_pinned = $collection->params()['use_pinned'] ?? false;
        
        if ((bool) $use_pinned === false) return;

        $removed_items = [];

        foreach ($collection as $item) 
        {
            $is_pinned = $item->header()->pinned ?? false;            
            if ((bool) $is_pinned === false) {
                $collection->remove($item->path());
                $removed_items[] = $item;
            }
        }

        foreach ($removed_items as $item) 
        {
            $collection->addPage($item);
        }
    }   
}
