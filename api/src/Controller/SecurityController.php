<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    #[Route('/login', name: 'api_login')]
    public function index(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'user'  => $user->getUserIdentifier(),
            'roles' => $user->getRoles()
        ]);
    }

    #[Route('/logout', name: 'api_logout', methods: ['POST'])]
    public function logout()
    {

    }
    
}