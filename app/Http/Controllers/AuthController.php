<?php

namespace App\Http\Controllers;

use App\Entities\User;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    /** @var JWTAuth */
    private $jwtAuth;

    public function __construct()
    {
        $this->jwtAuth = auth();
    }

    public function register(
        Request $request,
        Hasher $hash,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $email = $request->get('email');
        $password = $request->get('password');

        $user = $entityManager
            ->getRepository(User::class)
            ->findOneBy(['email' => $email]);

        if (!$user) {
            try {
                $hashedPassword = $hash->make($password);

                $user = (new User())
                    ->setEmail($email)
                    ->setPassword($hashedPassword);

                $entityManager->persist($user);
                $entityManager->flush();

                $credentials = [
                    'email' => $email,
                    'password' => $password
                ];

                $token = $this->jwtAuth->attempt($credentials);

                if (!$token) {
                    return new JsonResponse(['error' => 'Unauthorized'], 401);
                }

                return $this->respondWithToken($token);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Unauthorized'], 401);
            }
        }

        return new JsonResponse(['error' => 'User is already registered'], 401);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);
        $token = $this->jwtAuth->attempt($credentials);

        if (!$token) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me(): JsonResponse
    {
        return (new JsonResponse($this->jwtAuth->user()->getJWTCustomClaims()));
    }

    public function logout(): JsonResponse
    {
        $this->jwtAuth->logout();

        return new JsonResponse(['message' => 'Successfully logged out']);
    }

    public function refresh(): JsonResponse
    {
        return $this->respondWithToken($this->jwtAuth->refresh());
    }

    protected function respondWithToken(string $token): JsonResponse
    {
        return new JsonResponse([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
