<?php

namespace App\OpenApi;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;
use ApiPlatform\OpenApi\Model;
use ApiPlatform\OpenApi\Model\PathItem;
use ApiPlatform\OpenApi\Model\RequestBody;
use ApiPlatform\OpenApi\Model\Response;

class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated) {

    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        /** @var PathItem $path */
        foreach($openApi->getPaths()->getPaths() as $key => $path) {
            if($path->getGet() && $path->getGet()->getSummary() === 'hidden') {
                //dd($openApi->getPaths());
                $openApi->getPaths()->addPath($key, $path->withGet(null));	
            }
        }

        $openApi = $openApi->withInfo((new Model\Info('API', 'v1', 'Api Partner / Client'))->withExtensionProperty('info-key', 'Info value'));

        $schemas = $openApi->getComponents()->getSecuritySchemes();
        $schemas['cookieAuth'] = new \ArrayObject([
            'type' => 'apiKey',
            'in' => 'cookie',
            'name' => 'JPHPSESSID',
        ]);

        
        $schemas = $openApi->getComponents()->getSchemas();
        
        // Schema Credentials
        $schemas['Credentials'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'username' => [
                    'type' =>'string',
                    'exemple' => 'mail@mail.com'
                ],
                'password' => [
                    'type' =>'string',
                    'exemple' => '0000'

                ]
            ]
        ]);



        $pathItem = new PathItem(
            post: new Operation(
                operationId: 'post_api_login',
                tags: ['Auth'],
                requestBody: new RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/Credentials'
                            ]
                        ]
                    ])
                ),
                responses: [
                    '200' => [
                        'description' => 'User connected successfully',
                        'content' => new \ArrayObject([
                            'application/json' => [
                               'schema' => new \ArrayObject([
                                    '$ref' => '#/components/schemas/Credentials'
                                ])
                            ]
                        ])
                    ]
                ]
        ));

        $openApi->getPaths()->addPath('/login', $pathItem);

        return $openApi;

    }
}