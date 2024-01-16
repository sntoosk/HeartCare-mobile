
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { propsNavigationStack } from './Models';

import Home from '../screens/Home';
import Login from '../screens/SignIn';
import Cadastrar from '../screens/SignUp';
import FAQ from '../screens/FAQ/Index';

const { Screen, Navigator } = createNativeStackNavigator<propsNavigationStack>();

export function AuthStack() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Screen
                name="Cadastrar"
                component={Cadastrar}
                options={{ headerShown: false }}
            />
             <Screen
                name="FAQ"
                component={FAQ}
                options={{ headerShown: false }}
            />
        </Navigator>
    )
}