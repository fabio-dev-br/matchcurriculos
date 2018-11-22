<template>
    <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Dados Pessoais" active>

<b-list-group>
  Nome<b-list-group-item>{{$store.getters.name}}</b-list-group-item>
  E-mail<b-list-group-item></b-list-group-item>
  Tipo de usuário<b-list-group-item>{{tipousuario ()}}</b-list-group-item>
 
</b-list-group>



          </b-tab>
          <b-tab title="Habilidades">
            Currículos-incit é um portal open-source desenvolvido em setembro de 2018 ainda em processo de desenvolvimento, onde pessoas e empresas podem se cadastrar, onde a pessoa insere seus dados e seu currículo, assim as empresas buscam currículos conforme seus interesses de forma automática aparece os currículos que combinam com os interesses da empresa, a ideia é que o sistemas seja utilizado por diversas empresas.
          

            <div>
                <b-card-group columns>
                    <b-card title="Usuario Insira seu curriculo!"
                            img-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUPDxAPDxAQDxAPDw8QFRUQEA8QFhUWFhUVFRYYHiggGRolHRUVIjEiJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGy8mHR8tLS0tLS0tLS0tMC0rLS8tLS0rLS8tLS0vLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQFBgcAAQj/xABIEAACAgECAwQFCAYHBgcAAAABAgADEQQSBSExBhNBUSJhcYGRFCMyQlJTsdEHcpKhwdIkQ2JzsuHwFjNEVIKTCBUXY6LC8f/EABsBAAIDAQEBAAAAAAAAAAAAAAECAwQFAAYH/8QAPBEAAgEDAgMECQMCBQQDAAAAAAECAwQRITESQVEFE2FxFCIygZGhscHwUtHhFfEjMzRCogYkU5JicoL/2gAMAwEAAhEDEQA/AOfCaZgMMQihiEVhgQgCAhFYaiEVjFEYVhgThWGBCKxgEYQMCcKEBCBhgQi5HadV3DfkLnnjykdbj7t937XIntO5daPfvEM646G17OcG0WprZjXuKPt3brFzyB85mKtdU9Kr19x6KVp2ZWfFbLMeftb+8tx2S0X3J/bs/mnelVev0F/plt+n5v8Acre0vZrTVaZ7akKOm0/SZgwLAEEMT5ye3uakqijJ7lS+sKNOi5wWGvFmIxNI89k9icA9tnHZEX6hUOGJzjPTMKWSWFOU1lCjrq/M/AzuFj9xMfhundX5yi47t85f6A6dW8POJldV8ST0St0ARgRkZ6kEEYII6jEJDOLg8Pc8RADIBE4bIJEA2QCIBkAwgGQsiAYAiAYAiAYAiAYAiAZCzAMgTAMgDAEEwDBCEUMQgDWEVhiEVhgQisNRCKxgEIjDUQisYBCKwwIRchgQisYBCKwwIRWwgIRTQaPRG7hl9YeqonU1Hfc/doMbTzbzlSpLhrxeM6PY27CPFazWca8yx7LcJ+S6S75Rbo7Evsr7tjeRS+3OQbAOR5HpnpIa9TvKi4U9PDX4GhQp93TfE1r46EzWLX8g1HdfJcZqz8mua8Z3r9IsBgxafF30c557rBFecPos8Y5bPPMyOg0ve2pX03uqk+QJ5y5dV+4oTq/pTfwPOW9HvasafVpHQ0ror+YCoFAA2EZ3E+B8z0+M+fOje14+lJtttvOcYS96xz+B7RTtqT7jCSSWmN8/nzMP2i4etOoZE5IQHUfZB8Pjme17Hu5XVpGpP2tU/HHM8r2nbRoXDhDbde8n9nuyOm1lLXXvapWw1+gyqu0BSM5B55Yye5u5UZYWMYL/AGVaRrUm3nOfsix/9O+HYJ767A6nvEwM+foyt/Up76Gp/TI5xh5JI7KabPLXawndUw+fUktXyrPTqvhI/TvCP9yV9nyWvrfPkZHtJwhNJeaa2dl2iwtYQzFmyTk4E0reo6kMs8z2lTVOvhdCBodOLLURjgM4U468z0HrPSSTbjFtFahFTqKL5jNSiPU1gqFJSxUwCxDBgxwdxPpDb4efSRrKlhvOSaajKDko4w8fmeaK4iSkCFkQDIAiAZAEQDIWRFGQDCAdC2gGQBEAyAMAwBgGQBgGBgCEBCAMQihgQijBCKEIRWMURhGMUQisYBCKw1EIjGAQissV02m8dQw8x3J/mkfFP9PzJ+7o/r/4/wAjF02m/wCZb/sn+aHiqfp+YHTofr/4/wAllpOGaRmprL6h21AyLF2oo9N0+iQT9XzkcqlRKT00JoW9CUoQy25c9Et2tvcU7oASFO5cnDY25HnjwllZxqZs8JtJ5Rsex7FdJaQzoe/X0kqOoboP6sAk/wAJQu1mqvLrg3+yHihJ+PTJf8P1JbFZe9ju35fRvSuxRlk5rjJ8+sqzhjXC/wDZM1Izzpr8GiHxawvotQd1jDdXgWUNpioLjkNwG72yWksVY/vnkVb18VtP3csczE1ZVgy8mUhlPkQciaFSEakXCWzWH7zzsMxkpR3Wp0GjXI6o7LZnaHwtVrAMR4ELzHMz53Us6lGVSnBxw3jLnBPCfTOmcLPlg9jC4hUjCck+vsy3x5GG4ne11r2N1LEAdMKOQHwnvLG3jbUI0o8l83u/ieUuqsq1aU5c/pyNj2HQfJLATtHft6XTHopKt/7fu+5udi5VN4WdX9EXF2kR62Q2gqSuWyDtwcjqTM9wjKLWTdhVnCopKOqzp+YINXBqAwIuyQykDKcyDnEijQppp8RanfV5RacN14mP7fj+mH+6r/jPQ2X+X7zwPa/+o9yKLQb+9Q1gFw4K56Z9fq9csVMcLzsUaDl3keDfJI4lcvcvsbNfyuxnLMWIH9UeZ8Rv59TjmekigvWWd8f3LdR8UGqeq4n4+Xx11+JRV3KTjvVckDkFKYPlz6x4Sm88UcYfXOfEe6tqdNRdOXFlZejWH08fMNhGKSYDCcOhbCKMmLYQDIAwDIWRAOgDAMgDAMhZgGQBijIGcMEJwrDEZCsMQisYBCKw1EIrGAQiDFEIrGARhGGohFYxRCKXtfExyX5eoOANvdcx6ukrd3/8PmaXeSxnvP8Aj/Bdaa5S9NRuvdtQm7vV7tEGWdfoFCfq+cicXiUsLTlr+5PGouKEOJtyWc6Jc+WPATQ+7VaJu873KD5zbtz89b4er+EdrFOaxj+yK8ZcVxRec6b7c2UN/pOx3b8sTvxt3evHhLkdEuRlVPWm3nPibHsNrqqqrVssVG3hwGONw245efMfvmdfRk2pJcje7GnCMXTk0m3zeC1Hab+zX+3Mjjrf+N/Bnq+4s/8Azx+Mf3I3FOMC+pqTsUPtywbJGGB/hJKdavCSl3b+DIa9nZ1abg6618Y/uZW+kKxCncB4zboVJzpqU1hvkePvKFKjWcKU+KK5/UvtHxLSrSA9bG1VC7Ruw5HQ5zgTAuezr6dy3Ca4G850yvDGNfA0KN5bRopSi+JLx1M8V8ffPSrRYMZrJquy3EqKtO9dtvds1pYcmJxtTn6PsMoXdGdSXqrkbHZt1SoQfG+f28mWN/FdE9bVtquTbTna5Iwc+OZTlZVHFxaNWHa9CFRTTWn38kQEt4erBvlRO1g30G8Dn7MiXZk086/Isz/6jpSi46a+Zm+2Oqrv1JsqbendoMgEcxnPWbdrBwhiR4ztOpGrW4oPKwiu4bYqixWfui9exbME49Ibh6IJ5rkSSom8NLOCC2nGKkm8Nrf367dUWfYrs/TqLrb7tt9WncVUqQdjPgMzFT1xkYB8/VK93XlGKitG9za7NtYYc9zUcR4TptYj03V1Da7V1uoCvWQBgqfPJ6dJm0biUZNp7M27i0i4x03WTlPdshet+b1WPSx8yhxmbieUmuZ464p93UcT4ROIkLaAZC2EA6FsIBkAwijoW0AyAMAyFmAYAwDIEwDBCEVhrCBhrCIxghFYxYRWGIwjGKIRWMUQoRjFEIrPprLslSnBtfaT4herEe6dJ8KbJreClLXkbevs9oz3VHc1lHQFmAw5OWGd/wBLPIfCZ7qz1lnU2VFNxjya/cquBWN8tpodg/yWwU1uBjdVlmQnl19KWqiXcyl11KWf+6prpp9Sy07btVoiXWzKD01XYp+et6LgfhEaxTqafmEJGWbii850325sprBlidwfLE7gNob1gYGPhLK0WDPesm858RiJOHSGqkGR1EYEgyHAQScNgXqb66husdax5sQo/fFlOMVmTwPClOo8QWX4HtPali7q3V1P1lII/dOjOMllPIJ05QfDJYYZWMJgWywgwLZZwjQh0hI2iNYkdEEo4L7sJxyvTWWae9hWl7i2qxuS95gKysfDOBj2euU7yg5pSjyPQdlXMVHgka7jPFtHpKzda1WTllVdpstbwCgdSfOZtO3c5YSNupdcEdZaeZyQOzl7H5PbY9zDyLnOJuJYSS5HkLip3lRyBaAiQBnDIW0UdCzAMhZgHQtoBkAYo6FmAYAwDIEwBCEIAxCKwxCKxixhGMEIrGLCIxiiEVjFhEYxRGFHfJ3AF64zUwYA8t/mo90p1Lumqqobt9OXn+aLVmxZ9m1nbTupYjBLTOmdeX5q9EaJO2dQAbCb1GFTuvTB+yPAePjO9Eltr8ST0prXTTwIHC+MW1u9/dUCy2zvPSrDGvAwoU+HKWJUIuKi29PEzZ37jPMUvh9Czp7QWgqRVpQU+gRSuUGSfR8uZJ98R28ddXr4nRvqmjUY6bersRLHLsXIVSxzhBtUewDpJUsLBE3xNvr02DRZwUhqrAOkMCwDYM92l7QtpnFSVgs1e/ex5KSSBgePTMoXd53L4UtcGpY9nq4jxyeieMGDusZ2Luxdm5lm5kzFnOUnmR6SEYwjwxWEXXY/XrTed77K7EKnkSC+Rt6ePX4y3YVlCeG9GZ/adB1aWYrLT+XM6GBkZ8+fPl+M3jy7QLLOA0KZYRGhLrGEaI9iQoilEiXVg8iAR5GMiFNxehsf0fadEos2ov8AvvEZ+qvnM6+b415Ho+ypuVJt9fsa1VQ/VXPiMCUW2ay4XyF2VoOZVQPYIMsLUUUvH8HTXYVR8zZ4DP0TJqXtrzKtzh0pacmcraax5pC2EUdCzAMhbQDoBoBkLMAyAMUZAzhj6JwrGCMKGJwrGLGFYwQiMYsIrGLGQjGKIRGTtFQpy7nCr1HiT5TPvbmpFqjSXrS59Pz5G52RYUKkZXVzJKnT3XNvl7vrt1C1GoLnyUfRXwAktlZRt1neT3f5+Mq9rdr1L6eEuGnH2Y/d+PyWy8QUS8YzY2tZzBFZZLrWKyxFElFislSHIsA6Q1VgGGKsASB/spXr9dWbLWpSvTtdZgA7kqsT0Qc+jnvDz59Jl38I8ak+n0/ub3ZNSXBKCXNfP+xY9q/0Z6fUWPfpHOidgbWotQml+fNk2805kejg9RyGZnzUXrsbEeNYWj5aP6/vt4mWs/RjqaqrLtRdVX3Kq/doGd3UsACCQAv78eU6lSzJJ6bC1qnBByWuj8tEaPT6VakFa7iFGAWJZj7Ses9HGKisI8dOTnJye79wTLGEFMs4VoS6xhGiPYsJG0RbVjIgmjY9gx8xZ/ff/VZnXvtryN3sf/Jl5/ZGmWnPPmPIjrKTZsKOQLaSeZOSPcPdOTC4spuPD+jXf3Nn+EyWl7a8ytc/5U/JnLGmseZQpoGOhbRRkLaAdCzAMgDAOgGgGQBgCEs4DDEYVjFhFYxYRGGsIrGrGEYxYUIxiwisasIuS3q0yISR85jaPT2KuCVOcscZK5wOoz6pE5NotKlGLeNdt8JfPqvgLv0qouQzZ37SGXb4ZI6npy5+O7l0jxm2ytVpRjHKeuen5t99AaRHZHBEymsnoCfYMxG0ixGLew8IQcEEHyIwYM5JMNaMcogHQ1RAFDFE4Yvuyuhrse0suWFIRW6lQzBjgdM5RD/0yhfQUopM1uyakqc5NeH3NNdo2swbCmUGayq9LMg7+fsHL285nOm5e1y28+ptQrRp5UE8PfXl0+e/yI3GdF3lNrXBGxQ6qFBAX6xOevMqvwktKGakXIr3FRKhKMM4w2/hp8DDETbPLi2E4AphCKJcQitCHXx8POEja0yRbBGIZallwLtEdIjIKhZuffkttxyA6Y9Ugr2/evOcFqzv/RouPDnLzuWLdvm/5Zf+4f5ZB6Av1fIu/wBaf6Pn/Apu3rf8uv8A3D/LB6Cv1fIb+sv9Hz/ghcS7Ym6t6zQq70ZNwcnGRjpjnGhacMk87CVe1O8g48O66mSaWzMQpoB0LaAdC2ijoW0DGQtoBkAYBkDAMfRCBjFhFYYhEYxYRWMWEVjFjCMasIjGLCIyRpnCsCRuAzy5eRHiCP3Tmso6ElGWWslwGAY52sQXyHKJncVbOWG3PLYQOmJDuvz88S22k9dd98LfHXTwZ53C1nlvG1avDAYIcPzGfHAxjOwx0sy+f59yKclGD57L5b7Z8ts4LLgVWktXurVK2nkG3kBz4FT0VvUeRkVd1Yvii9CxZxtqkeCaxLz38uSfg9GbLhOg1VRVWvRqUG0Jsw5XHognwI5fCUKlSnLLUdX4m5b0K9PCc04rljXHIfxrS6U1vfqQAlNbWPaCQyooLHmOvTpEp1Zw0iS17elV1mjhun7bv37vZWO4ssZkrXAahCfRUfawMdfjLsKrWktTMq28W8w0Npw3XVXpvpcOvjjqp8mHUGWFJPYpSi4vDJqiE4bVxO3SML6kNwXldQDhraj9LZnlvHJh54I5ZzK1zByhpyLtjVjCp62iemSbxj9I+jDaQ6bV17LdQBq1NZZ6qNpzvB51tu2j2EnwmTKolg9BGk9dAuM9r69U3ybQt3tQIOp1a/7rA5iqs/XJ5ZI5AZHU8rVtFznlbIoX01TpuL3ly+5WkTUMEWwhAyh472ho02VJ7y3HKpTzH6x+r+PqiSqKJJToyn5CP0d9oV1WuOm1qqU1Cj5Ptyvd2pkhARzIYFup6qvnKtStNapl+ja0X6skdhv07LUU0+ysgAV5GUX2j4yopJyzPU0ZQap8NLCfLoZjiPCSSb9fZWQq7VFYKVgeZI9JmyeSjmfOW4VtOCiviZda1y+9upLC6ZS/dvwRm6NFTdc3db0rTacP6RceJJ+rnly5y5Kc4Q9bdmVCjSq1XwZUVjfXJH4tw5FQW1HcpJJYkdDgAKPHxnU6jbxIFxbxjFTht+bEOnhbtU1zEIqoWQEZNuCAceQ59T48hnwaVVKSihadtKVNzei5eJK1nAFFr1qz1hdOly98oBZiVUg4+iuSefhjny5yKNd8Kb640LU7JKbim1hZ1/P7FDqKWRijgqynDKeoMnTTWUU5RcXwy3RHaAKFtAMhZgHQtoo6FtAMgDAMgDAMfRCBjFhFYxYRGMWEVjFjIRjFhEYxYwrH6dQWAOcEgHHMxKknGDcd0h7eEalWMJt4bSeNXr0NPo+zVjVMyqWU9GwMjB8AeZ90xX2hVnKNSMdI8s7/ANuR7CPYVrRp1KFSp608YfD7OHlfHnqiFdean2sWtG1CQTgbgQQRyPl78maNrN3FPjxjV48vE892nRVjX7lyctE3nRZ308P5Izal2G1nZhnPM55/6/Ey8opapGNKrOSw2OrEDJIktCT1JMUmQjjVF92ls01DqnfGs2BgfnFQlgm76oJwfcJBVp8ePAt21bum1yZzPV6Oyl+7tQow8D4jzB6EeyVmmtGaCkpLKC0WsspcWVOUceI8fUR0I9RhTaeUCSUlhm94D2zrswmpxS/ICwf7pj6/s+/l65NGpncqzotaxC432601CnuQdQ4zjHo15/WPX3D3wTrKKGpW8pvGx1T/AGe0Gorpvu0enteyuo72rUscoDzJGT75h3NaNNxbWeJ4+J6GlxKOE9kY79JPH6uG6vT6cUAUvptw7vCd3hyMBemPhNK2qKC4TOvaDqPjT1INXaTRvWbReoVfpBsq49W3qfdmXlNYyZTpyzjBj+P9srLc16bNVfQ2f1jj1fZH7/ZIpVW9ieFBLWRkzIiwWnAeD6m51spzUEdXW88gjKQQV+0QR+6NGm5CTrxpa8+h0zUah2YuThmJY7cquTzOBnkJbjFJYMqc225dSHfYzfSZjjpkk4+MdJLYhnJvdntBxA0serKQfQHQtywT8IKlPjQKNw6Mn06eIPGOJC0BFUBQFYdcq2OY8vVFpUuHVj3FyqiUUtB93EEv07q7d3YoR9uSA7IAqlfDGPqHp1XxEjVNwmsbfn5n4ll3Ea1FqTxJa+eOn7e9cyw4qiDVJqbHWt/kdVxBP9bkIQQPpcj9EfSxjOMyGDfduC64LlZRVZVZPD4U/ft7/Ln5GS4nqxawKgqiIK6wTltgJI3Hz5npyHIDkJbhDhRmVqqqS02WiIDQkaFtAOhbQDoW0UdCzAMgDAMAYBj6IQMYIRRiwiMYsIrGLGQjGLCIxixhGTeH2bXHohskDmM459R65VvKanSeZYxn6c/A0eybh0bmOIKTbSw1nmtV4+J0bh/EqQlZZ3VqVZe7XO2zlj2Tz0KsUo50a5dT3Va1qynNQSam9+hj+M2l7NuxRuIYN48yeQPlzmt2VTSg6nE93pyXu6nmP+p67dWNDgWMRalze/Ppr8QE4TfvZNnpI4RgSBgkEj3YBOZpOvTSTzuecjY15ScVHVPD+o3T6V2ra0L83WVDNkci3ID1wuaUlHmw06cpQc1svuHXCxkSEikiB1ugqvTu7kDr1GeRU+YI5gxZRT3JIScXlGI432PtpzZRm6scyMfOIPZ9b2j4SvKm1sXYV1LR6GakZKQ+IEHl44PswZHMs0dsn6v4BqN+g0Tj6+m0rfGpfzmN2hPhdP8A+6NGksp+Rxj/AMQt2eJ0p9jQoT/1W2/kJpwK0zBocgEeXKWlsZ7WHgbpdLZa4rqRnc9FXr7T5D1mFJt4QG0llm04L2MRMPqiLG6iofQU/wBo/W9nT2yaFLqValw9omnKgDAAAHIAcgB6pOioxLwiMXTp2tcVoMuxIUZAycE9T7J0pKKy9hY05VJKEd2Rl0NlhIVclWVWBIBVidozn1wyqxgtXuRxtqtVtQW2E/e8Ea7SOqCxlwjMyKeXNl+lgeXrjKcW+FEbozjDja0bx8CI0ZioU0UdC2gGQtoo6FNAOhbQDoW0UdCzAMgDAMBFYx9EYDGCEUYsIjDWEVjVhEYxYwjGLCIxqHHSFrOjAm4vK3RKp1DBWQfXxnrnr4SKdCEpxm94lmnfVadGpRW1TGd86POnnz6nsnoc8uXPw9UnSS2KU5SftPbT+DecBsGs0zITi5UFNjD6TJghG/efgZlXEXSqJrbOV9z0thVjdW8oS9rHC3zxyYPE+GnS6Du87y+pVnIGPA4/wj4ySlV72txbaEFzbejWnBnOZLL2/NjMpqq/vK/2l/OXW0Zai+g9NXX95X+0v5xcokSfQcmrr+8r/aX852UMk+g5dZV95X+0v5wZQ2GYb9IFdXe1vV3eXV+8KYO4grgtjx5yCrjKwW6GcNMxeuTkG8uRlea5l2i+R+luwt4bhGgI8NJWvvQBf4Tzfa8uGVPwy/oa1uspnIf05295xpkH1NPp6z6uTP8Ag83oLJSqPCyZfQUCy1KydoexEJ5DaCQCefqlpLXBnSeE2dT4dp9Jpl2UmpR4nepZj5sc85aiorYoycpase2rr+8r/aX84coTD6CX1df3lf7S/nDlCuL6Ed9XX95X+0v5xsoRxfQkcEuB1NJQhvn6x6JB6kA9PUTErYdOXkNbZjXh5o1dPANmqsvD+jYWO3GNu47jnnz5zNqV3OmoY2N6hZKlXlWz7XLz1MV2i14uuxXypqHd0gdNo6n3n+E06FPghmW71Z529rqtVxD2VovzxIlnC7ACTt5Ak85Vj2pbykopvXTY1J/9N31Om6kksJZevRZIFdRdgo6npmW6tSNKDnLZGVa207irGlT3lsFqdC6Dc2MeoytRv6NaXBHfyNK77EurSn3tRLC6PqQWloy0LaAdC2gHQtoo6FmAZAGAYCAY+rCBjFhFYYhQoxYRGMWEVjFjCMasIjGLCIy34Bp1ez0lBAGRk4IbORgZ5+MirSaWhYtaalL1kWfFqkNO8qam3kkYGWbmBnHn1zI6LanjcnuoRdLiaxqROz3Ezpr1s+ofRsHmh6/Dr7pNXpd5BrnyKllc+j1lLls/I6ppWSwKw2uhKsp6g4III98xNYvHM9inGcU1qj8s8QHz1v8AfW/4zLS2KU9xIAhEYQAhFCwIQBCcA9YuQR5iBrKDF4eTuH6H9b3nCKkzk6e3UUt5j0zYB8HE8n20/wDFivD7/wAG7a+ycp7d6saji+suHMC81A/3arUf8BnpLbWCl4L6GZcvDwUxlkqA4E4IJEAQSJwQSIAnZv0H1KdFcSoJXXEqSOak01gke4yCo2tEW6UU0m+RpO2fFxTUaUb520YIHVKz1Pqz098mtKPHLieyKPal4qVPu4v1pfJHOs85rNZWDzEHiSY7iWr3tlSwGAMdJRsrV0aXDPGcm32x2mru4dSk2otJYenyyQCcdJcaTWGZMZOLytxvykd0UOSxbIPUY5flKUrZ+kxqxxhLH1NqHaMf6fO2nlzlJNPljT9iC0tmUhbQDIW0A6FmKOhZgGQBgGAgGPqzgMNYwrGCEVhrCIxqwisYsYRjFhEYxYRGSdLe1bB1xuGcHrjIxmc4qSwzozcHlbkzU8SssADMcbQrAdGOc5I+HwiwpxiNVuJzWGyOpkpVZY8N4hbSQa7HXawbaCdpI816GRzpxluizQr1Kb9VtfT4FA/ZOh2Lmy7LMzHBTGScn6sg9GiaH9QqPdINexen+8u+KfyzvR4jemz6IavYnT/eX/FP5YO4QVdy6IYOw+n+8v8Ain8s7uYh9Jl0RRdq+BV6Tuu7axu87zdvwcbduMYA+0ZHUgo7E1Go55yZ/MjJjpP6HOKrSmtrcgJWq60fqhStnw2p8Z5vtug3OnJc9DXsanqNPkc27wsS7/TsdrX/AFmJY/jPQ04cEVFcjMqy4pNkvhGmW6+upyQtjhCVxkZ8sySKy8EM3wxbRsz2G033l/xT+WT9zEq+ky6AN2I0/wB5f8U/lndygelS6IU3YrT/AHl/xT+Wd3EQemTXJCm7G6f7y74r/LD6PHqB301yRbcHRtFS1FFtoR7e+PPa2/aF6rjlgDlHhbwTzjPmQVr6rJYTx5aCrHJJJJJPUnmT7ZYSxsZrbbyxRnMaKy8HtVQ1Z2tjOM8ucgo14VocUNi7eWVWzqd3V3xnTUjNJSuj3ckoX5bQcHzzy/OQOvBVVS/3NZLsLKrK3dyvYTw/PTl7yM0kK6FtAOhbRR0LaAZANAMLaAZAGAYITgMMRgMMThGMWMKxghEYxYRWMWMIximERjFhFY1TCIxiwiMbW05nReGS6zFLEWSEaKSpj1MA6ZUcX7U0afKqe+tH1EPoqf7TdB7OZkU6qRZp0JT12Rh+L8Zu1TBrSMLnYijCoDjPrPQdfKVpScty7CnGC0IGYByRo9a9XebCB31L6d/XW5UsP/iJFVoxqcPF/teV5oeFRwzjmR5KIFVayMHUlWUhlYdQR0M47GTXcI7ankmqGf8A3kHP/qUfiPhJo1v1FWpa84fA1dGqSxQ9bK6noynIlhNPVFKSaeGfHaMRsju0JG2RbWjIrzZHYxhUBnnFexJB4kmTuIWU2ZYO2/bgDBx+ExrKnd0cU3FcOdX+P7Hre16/Zd5xV41Jd5jCWHjT/wDP3KpcZG44GRkjwE1ajkotx35HmqCpupFVHiOVl+HMk6i2oVFK2LZYHmD6vV6pl0aVzO4VWrFLCxp7/F9T0l1cWFKwlbW03Jyknqn4eC6FWxmoecQtooyFtAOhZgHQBgGQBgGQBgGPonADEIoYhFYxYRWMUxhGMWERjAYRWXnZ26nLV3BPTK7S4yuRkYJ8OvWYPblteT4KtrJpxznDxo8a+O2qNfsirbpypVknxYxlZ110+ZE12n7uxlHNdx2HnzXPLrNe0rqtSUs5fPz5lDtGynaV3Tmsc15fmjKzU6k79i55cjjqW8pcW2SKFFKOZr4ljX0GeuBmcU5bjVMJGyRU8VokhIRxHjdOnHptl8ZFa82P5e+QzqRjuXqFCdXbbqZTiHaG/UnYD3NR6qh5kf2m6n2chKsqkpvGxpQoQpLO7ILaQY5ZB/dO4FyCqzzqR7KWUAspAbcFJ6NtxnHnjIiYaJU09gMwBPZnAPZnBPhM47BN0vDnYkOGQKcHIwc+WDHjTbIateMFpqyetb6fNunsdGUZYZyrgeY6GO48GsSCNbvHw1Foy34Z2urf0dQO6b7Y51n2+K/hHhXT9oStZSWsNfqXjWAjIIIIyCOYIlpamZN43IzmMV28iiZwyAJgGSJ/EuEGupdRXYt1DnG8DayN9ll8DIIVuKTi1hl6racEFUg8xfP90U7SUrIW0A6FkxR0LMAyFtAOgDAMhZgGQBijAmcOeE4DDEIrGCERhqYRWMWEVjFMIjDUxhWMUwiM0vCqhaiW31s1aWBdw5b8c8D+Mw7j/tKzcH6st10/OR7Oxa7UtVGsv8Sm/VfXH5h+59Sp11ivazhAhPLHU4B5ZPifymraUVSpqMXlbr39PA8z2pezuq7lOPC1o14rm/Efwyqp3222d0p6NjI3eAJ+qPXgyepKUVmKyUaEKc54qSwvz4Gn03A2pclNPXrUZRgWMqNUevjyIPmOvqlOVwprWXCzWhYujJuMFUT64TX2NInBqLKlFmnrqYgMy14yjeQYdZU7+cZZjLJpehUZ00pwSfh+6OMfpT4CNHr2atQtGqHf1AcgrZxag9jc/Y4hhLO41SHDtsZvh1DtudUYoine2PRX3yamm3kqVpRSSb1ZLBkxWwBem8Yz0zjyGev4CLKORoS4WV7qQcHrIti0mnqj5OycezOOwTdBoTZ6Tck/e3s9UeEM77EFasoaLcu2fPM5J9fOWTNE6gMUYKCx2NgKMk8j4RZbMlpY41nqZk56AEnoAOZJ8secpGwlk/RPZzshp9Lp6K7K1a2qv50nmrXN6TkjxwSQM+AkffzScU9CV2dGclOUctC+McPO5kp4fQ6lcLduRNrEdSvLofwk1KponKo/Ip3Nu8uNOjFp89F8jNcU4NVp6wXvJtK5VAuQ59XiF/tHr4CW6deVSWFHT8/MGXXsqdGnmU/W+v8AHjzEcCr09oejUMKtxV6reQ2sMhlyeXMHx8o1dzjiUdeqBZxpVE6dR4zqmWnbLiWlo0q6StlJYrtVCGCKpyWYjzPvOSZVtoTlU45Gred2rfuqfyMWTNAwMCzFHQtoB0LMAyFkwDIAxR0LMAwBgGQJgGPCcBhiMKwxCKxghFYamEVjBCIMUwissOD6euy0C6wVVgF3Y9SB9VfWYtSUox9VZZJQpwnPE3hE3inGjY6iod3RTyprHQDplvMn+MijbRlBxnrxbliXaE4VozpaKGy/fzB15rdVtVl3MSrV/WGB9I+rw9cisadWlxU5+ytmWe2q9rdcFxS0nJesvH8+OhDUzRMBlno+N6mpQldzKo6LyIHsyOUilQpyeWtSxTva9OPDGWg7/aHVn/iLPcQPwg9GpfpC+0Ll/wC9kLi9h1iomqJuFVjWIWJLAsAGXP2TgHHmBO9Gp5zg5do3Cjjiz4vcKtF27AoCY27QMDHTGJLwrGCBVW3lvUx3ENIabCh6dVP2l8DKco8Lwa9OaqR4kRwYB8HyxAwwf/yBrIYycdiKdG+cKN3+vGJwPkTqrHGuhO0nDQOdnpH7PgPb5ySNLqVqty3pD4lhmSlQ+EzjsFxwbT7R3h6sML+r5++SQjzK9afIcdLV39ep7tDbVYlikjkzKcrvH1hkDrDOhCe4KN9Vpey9PHUtP/P9WP8AiLfe2fxgdvS/Sjlf3K/3s9/tHrPv394U/wAIvotL9JIu0bn9f0KvU3tYxd2LMxyzHmSZNGKisIrSnKcnKTy2R2M45CNRUHXB9x8jAS05uLyiBTeaz3b9PA+X+U5lqdNTXHElsYpXQsmKMgGgHQswDIAwDIWYBgDAMgYBjyzjgxCKwxCKGIRWMEIrDUxhGMUwisYDCKw1MIjGAwisMGEVhgwitDAYRQgZwuCj4p2gei81hEZQFPMkMcjPX/KZ9zeSo1OHGUbth2TTuaHeOTTy/I9q+JJqUXCkAE8z9JW5cgR/rpOhcxr5wsYOlY1LNpyknnp4dSGNOvrj8IneMNaVHh8YcIVzkMBhEPuZx2D5mcHAmzU7TyAYjwPT3xXIkhTzuStd2n2AKteXwN270VBx4AdZBLtJJYjHXxLNPsBuWak9PDf5lhwbXNfSLGABLMMLnHI48ZdtqrqU1JmRf20beu6cdljclkycqYBJgGQsmAZAEwDIBjAMiNqKVfG7wP8AoTsk1Oo4bH0xTgCYBkLYwDIWYBkC0AyFmAZAGKMgZwTwnHBiEDDEIrDBhFYYhFYwGEVhgwiMMGEVjAYRWGDCJgMGEDQwGEVoIGEXAYMIpje05/pLfqV/gZh9o/5vuPX9if6X3s+8IJ2N5b+Xtxz/AITrHeXu+53aq0h7/sT8zQMY+7px2D2Z2QYAe5R1Pu8YHIdQbI1upJ6ch++I5ZJo00hBMBIRNeT3r567z/l+6Yx6Q1XZc/0Zf17P8Rm/Zf5KPGdr/wCrl7voWZMtGbgEmAbABMAwBM4ZCyYBkATFGQsmAdAMYBkLJgGQBgGQBgGAMAwBgGBgCeE44MQihCEDDEYUMGcKGDCKxgMYVoMGcKGDCKxgMYQMGcKEDCAMGEXAYMIuCj4rwR77u8DoqlVHPJbIz4f5yhcWkqtTizobVj2nC2o8Di2858Pz3EmrgiooVHPmxbnk+fLpHp2caeeF7kNftWdfCnFabYGLwrzf4D/OTdz4lV3fgOThlY6lm9+PwjKkiN3U3sSU01Y5BF94z+MdQiuRE6s3zI9vCqG+pt/VJH7ukR0oPkSxu6seefMiWcBT6tjD2gH8ojt1yZPG/lzihDcAPhaPev8AnF7h9SRdoL9PzB4h2dD+lW5Vsc93NW+HSVZ9mxx6r+Jeo9uyz/iR08P5J/B9K1NIrYqSC5yvMc2JHX2y7b03TpqL3Mu+rxr1nUjs+vkSyZKVcAEzhsAkwDJAEwDIWxgGQBMAyAJgGAJgGAJgGQswDIEwDIAwDIAwBBMAx//Z"
                            img-fluid
                            img-alt="image"
                            img-top>
                        <p class="card-text">
                            Mostre ao mundo suas habilidades!!
                        </p>
                    </b-card>
                    <b-card header="Diferencial">
                        <blockquote class="blockquote mb-0">
                            <p>E assim todas as combinação são ofereciadas.</p>
                        </blockquote>
                    </b-card>
                    <b-card title="Empresa insira seus interesses"
                            img-src="https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2018/01/10/a345f087d3ee225441b329403b24179a.jpg"
                            img-fluid
                            img-alt="image"
                            img-top>
                        <p class="card-text">
                            Escolha seus interesses!!
                        </p>
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </b-card>
                    <b-card bg-variant="primary"
                            text-variant="white">
                        <blockquote class="card-blockquote">
                            <p>
                                Cadastro simples e rápido, banco de curriculos e empresas.
                            </p>
                           
                        </blockquote>
                    </b-card>
                    <b-card title="Modular e open source">
                        <p class="card-text">
                            Sistema pode ser adotado por qualquer empresa sem custos.
                        </p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </b-card>
                    
                    <b-card img-src="https://cdnstatic8.com/inglesnoteclado.com.br/wp-content/uploads/2017/04/O-Que-Significa-Match-Em-Ingl%C3%AAs.jpg"
                            img-fluid
                            img-alt="image"
                            img-top>
                        <p class="card-text">
                            Combinações de acordo com interesses da empresa
                        </p>
                       
                    </b-card>
                </b-card-group>
            </div>
            


        </b-tab>
          <b-tab title="Contato:">
            E-mails:
          </b-tab>
        </b-tabs>
      </b-card>
  </template>
  
  <script>
  export default {
    data () {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
     tipousuario () {
            // user_type = this.$store.getters.user_type;
            if(this.$store.getters.userType == 0) {
                return'Empresa';
            } else {
                 return'Pessoa';
            }
    }
  }
  }
  </script>
