use std::io;

use actix_rt::blocking::BlockingError;
use actix_web::{ResponseError};
use base64::DecodeError;
use sqlx::Error as SqlxError;

use crate::api::ApiResult;

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("Sqlx error: {0}")]
    Sqlx(#[from] SqlxError),
    #[error("IO error: {0}")]
    Startup(#[from] io::Error),
    #[error("Base 64 error: {0}")]
    Base64DecodeError(#[from] DecodeError),
    #[error("Unexpected blocking while creating file")]
    FileBlock,
    #[error("Invalid email!")]
    EmailError,
}

impl ResponseError for Error {
    /// Convert an Error to a HttpResponse
    fn error_response(&self) -> actix_web::HttpResponse {
        return ApiResult::<()>::new()
            .with_msg(format!("{}", &self))
            .code(self.status_code().as_u16())
            .to_resp();
    }
}
