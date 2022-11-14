<?php

namespace App\EventListener;

use App\Entity\Client;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ClientEvent
{

    public function __construct(HttpClientInterface $request, SerializerInterface $serializer)
    {
        $this->request = $request;
        $this->serializer = $serializer;
    }

    public function postPersist(Client $client, LifecycleEventArgs $event): void
    {
        $json = $this->serializer->serialize($client, 'json');
        $this->request->request('GET','https://webhook.site/f79663c7-cac2-4095-8d8b-1b72a0fdb041',['body' => $json]);
    }

}