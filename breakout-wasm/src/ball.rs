use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct Ball {
    x: f64,
    y: f64,
    r: f64,
    dx: f64,
    dy: f64,
}

#[wasm_bindgen]
impl Ball {
    pub fn new(x: f64, y: f64, r: f64) -> Self {
        Self {
            x,
            y,
            r,
            dx: 2.3,
            dy: -2.3,
        }
    }

    pub fn bounce(&mut self) {
        self.x += self.dx;
        self.y += self.dy;
    }

    fn change_dx(&mut self) {
        let rand = js_sys::Math::random() * 2.0;

        self.dx = -self.dx;
        if self.dx < 0.0 {
            self.dx = -3.0 - rand;
        } else {
            self.dx = 3.0 + rand;
        }
    }

    fn change_dy(&mut self) {
        let rand = js_sys::Math::random() * 2.0;

        self.dy = -self.dy;
        if self.dy < 0.0 {
            self.dy = -3.0 - rand;
        } else {
            self.dy = 3.0 + rand;
        }
    }

    pub fn edge_collide(&mut self, canvas_width: f64, canvas_height: f64) -> bool {
        if self.x < self.r {
            self.x = self.r + 1.0;
            self.change_dx();
        } else if self.x > canvas_width - self.r {
            self.x = canvas_width - self.r - 1.0;
            self.change_dx();
        }
        if self.y < self.r {
            self.y = self.r + 1.0;
            self.change_dy();
        } else if self.y > canvas_height - self.r {
            self.change_dy();
            return true;
        }
        false
    }

    pub fn hit_paddle(&mut self, paddle_x: f64, paddle_y: f64, paddle_w: f64) {
        if self.y > paddle_y - self.r && self.x > paddle_x && self.x < paddle_x + paddle_w {
            self.y -= 1.0;
            if self.x < paddle_x + paddle_w / 2.0 {
                self.dx = -(self.dx.abs());
                self.change_dy();
            } else {
                self.dx = self.dx.abs();
                self.change_dy();
            }
        }
    }

    pub fn break_bricks(&mut self, b_x: f64, b_y: f64, b_w: f64, b_h: f64) -> bool {
        if self.x > b_x
            && self.x < b_x + b_w
            && (self.y < b_y + b_h + self.r && self.y > b_y + b_h / 2.0
                || self.y > b_y - self.r && self.y < b_y + b_h / 2.0)
        {
            self.change_dy();
            return true;
        }
        if self.y > b_y
            && self.y < b_y + b_h
            && (self.x < b_x + b_w + self.r && self.x > b_x + b_w / 2.0
                || self.x > b_x - self.r && self.x < b_x + b_w / 2.0)
        {
            self.change_dx();
            return true;
        }
        false
    }

    pub fn x(&self) -> f64 {
        self.x
    }
    pub fn y(&self) -> f64 {
        self.y
    }
    pub fn r(&self) -> f64 {
        self.r
    }
}
