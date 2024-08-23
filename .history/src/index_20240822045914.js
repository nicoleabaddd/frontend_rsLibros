function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
          <Route path="login" element={<Login />} />
          <Route path="exchanges" element={<Exchanges />} />
          <Route path="messager" element={<Messager />} />
          <Route path="buttonHome" element={<ButtonHome />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="recommendationsList" element={<RecommendationsList />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="bookCreate" element={<BookCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App/>);
