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
    <h1 class="text-red-900 text-96">Hello this is admin page from view,</h1>
    @foreach ($admin as $admin)
        <li class="flex p-2 inline-flex">{{ $admin }}</li>
    @endforeach
</body>
</html>