<html>
    <head>
        <title>@yield('title')</title>
        <link rel="stylesheet" type="text/css" class="ui" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css">
    </head>
    <body>
        <div class="ui container">
            <header>
                @include('components.header')
            </header>
            @yield('banner')
            <div class="ui stackable grid">
                <div class="four wide column">
                    @yield('leftNavbar')
                </div>
                <div class="twelve wide column">
                    @yield('mainContainer')
                </div>
            </div>
            <footer>
                @include('components.footer')
            </footer>
        </div>
        <script src="@yield('script')"></script>
    </body>
</html>
