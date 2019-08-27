use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Paddle {
    x: f64,
    y: f64,
    w: f64,
    h: f64,
}

#[wasm_bindgen]
impl Paddle {
    pub fn new(x: f64, y: f64, w: f64, h: f64) -> Self {
        Self { x, y, w, h }
    }

    pub fn control(&mut self, mouse_x: f64) {
        self.x = mouse_x - self.w / 2.0;
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
}
