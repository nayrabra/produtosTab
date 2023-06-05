import React,{useState, useEffect} from 'react'
import { supabase } from './createClient'
import './App.css';

const App = () => {

    const [produtos, setProdutos] = useState([])

    const[produto, setProduto]=useState({
      nome:'',valor:''
    })

    const[produto2, setProduto2]=useState({
      id:'',nome:'',valor:'', editing: false
    })

    console.log(produto2)

    useEffect(() => {
      buscarProdutos()
    }, [])

    async function buscarProdutos() {
        const {data} = await supabase
        .from('produtos')
        .select('*') /*seleciona todos*/
        setProdutos(data)
    }

    function handleChange(event){
      setProduto(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }

    function handleChange2(event){
      setProduto2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
        return prevFormData;
      })
    }

    async function adicionarProduto() {
        await supabase
        .from('produtos')
        .insert({ nome: produto.nome, valor: produto.valor})
      buscarProdutos()
    }

    async function deletarProduto(produtoId){
      const { data, error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', produtoId)

      buscarProdutos()

      if (error){
        console.log(error)
      }

      if (data){
        console.log(data)
      }

    }

    function displayProduto(produtoId) {
      produtos.map((produto)=>{
          if(produto.id==produtoId){
            setProduto2({id:produto.id,nome:produto.nome,valor:produto.valor,editing:true})
          }
        
      })
      
    }

    async function atualizarProduto(produtoId) {
      if (produto2.editing) {
        const { data, error } = await supabase
          .from('produtos')
          .update({ nome: produto2.nome, valor: produto2.valor })
          .eq('id', produtoId);
    
        buscarProdutos();
    
        if (error) {
          console.log(error);
        }
    
        if (data) {
          console.log(data);
        }
    
        setProduto2((prevFormData) => ({
          id: '',
          nome: '',
          valor: '',
          editing: false
        }));
      }
    }
    

    return (
        <div>

          {/* FORM 1 */}
          <form onSubmit={adicionarProduto}>
            <input
              type="text"
              placeholder="Nome"
              name='nome'
              onChange={handleChange}

            />

            <input
              type="number"
              placeholder="Valor"
              name='valor'
              onChange={handleChange}

            />

            <button type='submit'>Adicionar</button>

          </form>

            {/* FORM 2 */}
          <form onSubmit={() => atualizarProduto(produto2.id)}>
            <input
              type="text"
              name="nome"
              onChange={handleChange2}
              value={produto2.nome}
              disabled={!produto2.editing}
            />

            <input
              type="number"
              name="valor"
              onChange={handleChange2}
              value={produto2.valor}
              disabled={!produto2.editing}
            />

            {produto2.editing ? (
              <button type="submit">Salvar Mudanças</button>
            ) : (
              <button disabled>Salvar Mudanças</button>
            )}
          </form>


          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
            {produtos.map((produto)=>
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.valor}</td>
                <td>
                  <button onClick={()=>(deletarProduto(produto.id))}>Deletar</button>
                  <button onClick={()=>(displayProduto(produto.id))}>Editar</button>
                </td>
              </tr>
            )}

            </tbody>
          </table>
        </div>
    )
}

export default App