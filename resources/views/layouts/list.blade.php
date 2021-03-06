<html>
    <head>
        <title>@yield('title')</title>
        <link rel="stylesheet" type="text/css" class="ui" href="//huwence.mugeda.com:8090/assets/semantic.min.css">
    </head>
    <body>
        <div class="ui container">
            <header>
                @include('components.header')
            </header>
            @yield('banner')
            @yield('mainContainer')
            <footer>
                @include('components.footer')
            </footer>
        </div>
        @include('layouts.javascript_resources')
        <script src="@yield('script')"></script>
    </body>
</html>
