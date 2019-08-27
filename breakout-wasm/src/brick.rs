use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Brick {
    x: f64,
    y: f64,
    w: f64,
    h: f64,
    color: String,
}

#[wasm_bindgen]
impl Brick {
    pub fn new(x: f64, y: f64, w: f64, h: f64, color: String) -> Self {
        Self { x, y, w, h, color }
    }

    pub fn x(&self) -> f64 {
        self.x
    }
    pub fn y(&self) -> f64 {
        self.y
    }
    pub fn w(&self) -> f64 {
        self.w
    }
    pub fn h(&self) -> f64 {
        self.h
    }
    pub fn color(&self) -> String {
        self.color.clone()
    }
}
