<?php 

namespace App\Serializer;

use App\Entity\Client;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class CurrentUserDenormalizer implements DenormalizerInterface, DenormalizerAwareInterface {

    use DenormalizerAwareTrait;

    private const ALREADY_CALLED_DENORMALIZER = 'CurrentUserDenormalizerCalled';

    public function __construct(private Security $security){

    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null, array $context = []) {
        
        $reflectionClass = new \ReflectionClass($type);
        $alreadyCalled = $context[self::ALREADY_CALLED_DENORMALIZER] ?? false;

        return ($reflectionClass->name === Client::class && $alreadyCalled === false);
    
    }
    
    public function denormalize(mixed $data, string $type, string $format = null, array $context = []) {

        $context[self::ALREADY_CALLED_DENORMALIZER] = true;
        $obj = $this->denormalizer->denormalize($data, $type, $format, $context);
        $obj->setUser($this->security->getUser());
        return $obj;

    }

}