import SplashScreen from '../containers/Splash/splash.ui';
import HomeScreen from '../containers/Home/home.ui';
import ArticleDetails from '../containers/Article/articleDetail.ui';
import LoginScreen from '../containers/Login/login.ui';

export default RootRoutes = {
    Splash: {
        screen: SplashScreen,
        name: 'Splash'
    },
    Login: {
        screen: LoginScreen,
        name: 'Login'
    },
    Home: {
        screen: HomeScreen,
        name: 'Home'
    },
    ArticleDetail: {
        screen: ArticleDetails,
        name: 'ArticleDetail'
    }
}