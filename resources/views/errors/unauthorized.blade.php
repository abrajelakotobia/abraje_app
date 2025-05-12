<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>401 Unauthorized</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            background-color: #f8fafc;
            color: #1a202c;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-align: center;
            padding: 50px;
        }

        .error-container {
            max-width: 600px;
            margin: auto;
        }

        h1 {
            font-size: 6rem;
            color: #e53e3e;
            margin-bottom: 0;
        }

        h2 {
            font-size: 2rem;
            margin-top: 0;
        }

        p {
            font-size: 1.2rem;
        }

        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 20px;
            background-color: #3182ce;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        a:hover {
            background-color: #2b6cb0;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>401</h1>
        <h2>Accès non autorisé</h2>
        <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
        <a href="{{ url('/') }}">Retour à l'accueil</a>
    </div>
</body>
</html>
