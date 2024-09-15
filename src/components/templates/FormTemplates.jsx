function AuthForm({ form }) {
  return <div className="auth-form">{form}</div>;
}

function SectionForm({ form }) {
  return <section className="section-form">{form}</section>;
}

function ArticleForm({ form }) {
  return <article className="article-form">{form}</article>;
}

export { AuthForm, SectionForm, ArticleForm };
