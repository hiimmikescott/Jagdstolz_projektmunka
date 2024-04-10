<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
       
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333333;
            text-align: center;
            margin-bottom: 20px;
        }
        h2 {
            color: #666666;
            text-align: center;
            margin-top: 0;
        }
        .code {
            font-size: 24px;
            text-align: center;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            color: #999999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
<div class="container">
        <h1>{{ $content['title'] }}</h1>
        <div class="code">{{ $content['code'] }}</div>
        <h2>Köszönjük a regisztrációt!</h2>
        <p class="footer">Ez egy automatikus e-mail, kérjük, ne válaszoljon.</p>
    </div>
</body>
</html>
