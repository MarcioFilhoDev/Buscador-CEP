import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

const statusBarHeight = StatusBar.currentHeight;

import { api } from "./src/Services/api";

export default function App() {
  const [input, setInput] = useState(""); // Armazenar valores digitados pelo usuario
  const inputRef = useRef(null); // referenciar o input
  const [cepUser, setCepUser] = useState(null); // Armazenar o resultado do cep buscado

  function limpar() {
    setInput("");
    setCepUser(null);
    inputRef.current.focus();
  }

  async function buscar() {
    if (input == "" || input.length < 8) {
      alert("Digite um CEP válido!");
      setInput("");
      return;
    }

    // Se api falhar, usar try para mostrar onde esta o erro
    try {
      const response = await api.get(`${input}/json`);
      setCepUser(response.data);

      Keyboard.dismiss();
    } catch (error) {
      console.log("erro: " + error);
    }
  }

  return (
    <View style={st.container}>
      <Text style={st.title}>Buscador de CEP</Text>

      <View style={st.inputArea}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Digite um CEP</Text>

        <TextInput
          keyboardType="decimal-pad"
          maxLength={8}
          placeholder="Ex: 38400-100"
          value={input}
          onChangeText={(texto) => setInput(texto)}
          style={st.input}
          ref={inputRef}
        />
      </View>

      <View style={st.areaBtns}>
        <TouchableOpacity style={st.areaBotao1} onPress={buscar}>
          <Text style={st.textoBotao}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={st.areaBotao2} onPress={limpar}>
          <Text style={st.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && (
        <View style={st.resultado}>
          <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}>
            Resultado
          </Text>

          <View>
            <Text style={st.itemTxt}>CEP: {cepUser.cep}</Text>

            <Text style={st.itemTxt}>
              Estado: {cepUser.estado} / {cepUser.uf}
            </Text>

            <Text style={st.itemTxt}>Cidade: {cepUser.localidade}</Text>
            <Text style={st.itemTxt}>Bairro: {cepUser.bairro}</Text>
            <Text style={st.itemTxt}>Logradouro: {cepUser.logradouro}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dadada",
    alignItems: "center",
    paddingTop: statusBarHeight,
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 30,
  },
  inputArea: {
    backgroundColor: "#fff",
    width: "50%",
    padding: 20,
    borderRadius: 10,
    gap: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#dadada",
    borderRadius: 8,
    paddingLeft: 20,
    width: "100%",
  },
  areaBtns:{
    flexDirection:'row',
    gap: 10
  },
  areaBotao1: {
    backgroundColor: "#06b6d4",
    width: '40%',
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  areaBotao2: {
    backgroundColor: "#DC3545",
    padding: 10,
    width: '40%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 500,
    color: "#fafafa",
  },
  resultado: {
    backgroundColor: "#fff",
    width: "80%",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  itemTxt: {
    fontSize: 16,
  },
});
