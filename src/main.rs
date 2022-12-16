use axum::{http::StatusCode, response::IntoResponse, routing::get_service, Router};
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    let serve_dir = get_service(ServeDir::new("docs")).handle_error(handle_error);
    let app = Router::new()
        .fallback_service(serve_dir)
        .into_make_service();

    axum::Server::bind(&"0.0.0.0:7878".parse().unwrap())
        .serve(app)
        .await
        .unwrap();
}

async fn handle_error(_err: std::io::Error) -> impl IntoResponse {
    StatusCode::INTERNAL_SERVER_ERROR
}
