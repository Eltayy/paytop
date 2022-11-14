<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserClientFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $userAdmin = new User();
        $userAdmin->setEmail('admin@test.com');
        $userAdmin->setRoles(['ROLE_ADMIN']);
        $userAdmin->setPassword('$2y$13$jmnMWLTBJtJKvykHBa/DoeziC7W.ZtW/BnyfzMLeyXKSFRNm.VyHi');
        $manager->persist($userAdmin);
       
        $userPartner1 = new User();
        $userPartner1->setEmail('partner1@test.com');
        $userPartner1->setRoles(['ROLE_USER']);
        $userPartner1->setPassword('$2y$13$jmnMWLTBJtJKvykHBa/DoeziC7W.ZtW/BnyfzMLeyXKSFRNm.VyHi');
        $manager->persist($userPartner1);
        
        $client1 = new Client();
        $client1->setLastName('Pineau');
        $client1->setFirstName('Pierre');
        $client1->setEmail('Pineau@example.com');
        $client1->setPhoneNumber('012345678');
        $client1->setUser($userPartner1);
        $manager->persist($client1);

        $client2 = new Client();
        $client2->setLastName('Titouan');
        $client2->setFirstName('Thibaba');
        $client2->setEmail('Titouan@test.com');
        $client2->setPhoneNumber('012345678');
        $client2->setUser($userPartner1);
        $manager->persist($client2);

        $userPartner2 = new User();
        $userPartner2->setEmail('partner2@test.com');
        $userPartner2->setRoles(['ROLE_USER']);
        $userPartner2->setPassword('$2y$13$jmnMWLTBJtJKvykHBa/DoeziC7W.ZtW/BnyfzMLeyXKSFRNm.VyHi');
        $manager->persist($userPartner2);

        $client3 = new Client();
        $client3->setLastName('Fabienae');
        $client3->setFirstName('Fabrice');
        $client3->setEmail('Fabienae@test.com');
        $client3->setPhoneNumber('012345678');
        $client3->setUser($userPartner2);
        $manager->persist($client3);

        $client4 = new Client();
        $client4->setLastName('Atrae');
        $client4->setFirstName('Arthur');
        $client4->setEmail('Arthur@test.com');
        $client4->setPhoneNumber('012345678');
        $client4->setUser($userPartner2);
        $manager->persist($client4);

        $manager->flush();
    }
}
