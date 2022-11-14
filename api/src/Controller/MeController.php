<?php 

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[AsController]
class MeController extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    #[Route(
        name: 'user_me',
        path: '/me',
        methods: ['GET'],
        defaults: [
            '_api_resource_class' => User::class,
            '_api_operation_name' => '_api_/users{._format}_get_collection',
        ],
    )]
    public function __invoke()
    {
        $user = $this->security->getUser();
        return $user;
    }
}