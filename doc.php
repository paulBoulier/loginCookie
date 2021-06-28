<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="./assets/js/script.js" type="module" defer></script>
    <title>Document</title>
</head>
<body>
    <div class="container">
        <form action="./index.php" method="POST" class="row g-3">
            <div class="mb-3">
                <label for="gender" class="form-label">Genre</label>
                <select name="gender" id="gender" class="form-select">
                    <option value="" selected disabled hidden>Sélectionner un genre</option>
                    <option value="male">Mr</option>
                    <option value="female">Mme</option>
                    <option value="other">Non spécifié</option>
                </select>
                <div class="feedback"></div>
            </div>
            <div class="mb-3">
                <label for="lastname" class="form-label">Nom</label>
                <input type="text" class="form-control" id="lastname" name="lastname">
                <div class="feedback"></div>
            </div>
            <div class="mb-3">
                <label for="firstname" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="firstname" name="firstname">
                <div class="feedback"></div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Addresse email</label>
                <input type="text" class="form-control" id="email" name="email">
                <div class="feedback"></div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="mb-3">
                <label for="cPassword" class="form-label">Confirmer le mot de passe</label>
                <input type="password" class="form-control" id="cPassword" name="cPassword">
                <div class="feedback"></div>
            </div>
            <div class="mb-3">
                <div class="form-label">Choix de la formule</div>
                <div class="form-check">
                    <label for="gull" class="form-check-label">
                        <span>Mouette</span> - <span>Gratuit</span>
                    </label>
                    <input class="form-check-input" id="gull" type="radio" name="formula" value="gull">
                </div>
                <div class="form-check">
                    <label for="seagull" class="form-check-label">
                        <span>Goéland</span> - <span>0,99€</span>
                    </label>
                    <input class="form-check-input" id="seagull" type="radio" name="formula" value="seagull">
                </div>
                <div class="form-check">
                    <label for="albatross" class="form-check-label">
                        <span>Albatros</span> - <span>1,99€</span>
                    </label>
                    <input class="form-check-input" id="albatross" type="radio" name="formula" value="albatross">
                    <div class="feedback"></div>
                </div>
            </div>
            <div class="mb-3">
                <label for="instagram" class="form-label">Instagram</label>
                <input type="text" class="form-control" id="instagram" name="instagram">
                <div class="feedback"></div>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="CGU" name="CGU">
                    <label class="form-check-label" for="CGU">CGU</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>
</html>
