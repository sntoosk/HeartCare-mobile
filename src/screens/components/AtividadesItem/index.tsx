import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { styles } from "./styles";
import Atividade from "../../../models/Atividade";
import * as Animatable from "react-native-animatable";
import AtividadesItemProps from "../../../props/AtividadesItemProps";
import { useTheme } from "../../../context/ThemeContext";
import shadow from "../../../utils/styles";

export default function AtividadesItem({ user }: AtividadesItemProps) {
  const { theme } = useTheme();
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "atividades"),
          where("Usuario", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const atividadesData = querySnapshot.docs.map(
          (doc) => doc.data() as Atividade
        );
        setAtividades(atividadesData);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Animatable.View
      animation="slideInLeft"
      style={styles.containerCardsAtividade}
    >
      {atividades.slice(-3).map((item, index) => (
        <CartaoAtividade data={item} key={index} theme={theme} />
      ))}
    </Animatable.View>
  );
}

const CartaoAtividade: React.FC<{ data: Atividade; theme: any }> = ({
  data,
  theme,
}) => {
  const calcularPorcentagem = (tempo: number) => (tempo / 120) * 100;
  const progresso = calcularPorcentagem(data.Tempo);

  return (
    <View
      style={[
        styles.containerCartao,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD,
          ...shadow.shadowOverlay
         },
      ]}
    >
      <View style={styles.containerProgresso}>
        <View style={[styles.circle, { borderColor: theme.COLORS.PRIMARY }]}>
          <Text style={[styles.number, { color: theme.COLORS.ICON }]}>
            {progresso.toFixed(0)}%
          </Text>
        </View>
      </View>
      <View style={styles.containerDetalhes}>
        <Text
          style={[styles.textoDetalhes, { color: theme.COLORS.POST_TITLE }]}
        >
          Tempo: {data.Tempo} min
        </Text>
      </View>
      <Text style={[styles.nomeAtividade, { color: theme.COLORS.POST_TITLE }]}>
        {data.Modalidade}
      </Text>
    </View>
  );
};
