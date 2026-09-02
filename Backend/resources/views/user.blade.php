<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Admin page</title>
</head>
<body class="p-10">
    <h1>This is all <span class="bold text-red-700">USER</span></h1>
    @foreach ($user as $user)
        <li>{{ $user }}</li>
    @endforeach
</body>
</html>