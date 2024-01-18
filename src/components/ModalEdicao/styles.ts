// styles.ts
import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente
  },
  modalContent: {
    backgroundColor: theme.COLORS.WHITE,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  textoModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputEditavel: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  botaoSalvar: {
    backgroundColor: theme.COLORS.PRIMARY,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoFechar: {
    backgroundColor: theme.COLORS.BUTTON,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotao: {
    color: theme.COLORS.WHITE,
  },
});

export default styles;