bw = 4; // bracket width
bh = 10; // bracket height
cl = 15; // clamp length
ad = 8; // axle diameter
hd = 3; // bolt hole diameter
nd = 6; // bolt nut diameter
mhd = 2.5; // microswitch hole diameter
ai = 0.75; // axle inset for clamp
xw = 0.4; // extrude width
mhs = 9.5; // microswitch hole separation
bl = cl + ad / 2 + (bw - ai) + hd * 3 + mhs; // bracket length
translate([0,0,bh/2]){
	difference(){
		union(){
			cube([bl,bw,bh], center = true);
			translate([-bl/2 + cl/2,bw + ad - 2*ai,0])
				cube([cl,bw,bh], center = true);
			difference(){
				translate([-bl/2 + cl,(ad+bw)/2-ai,0]) 
					cylinder(r=ad/2+bw-ai, h = bh, center = true, $fn = 40);
				translate([-bl/2+cl-ad/2-bw/2+ai/2,(ad+bw)/2-ai,0])
					cube([ad/2+bw-ai,ad,(bh+xw)],center=true);
			}
		}
		# translate([-bl/2 + cl,(ad+bw)/2-ai,0]) cylinder(r=ad/2+xw,h=bl,
		            center = true, $fn = 40);
		# translate([-bl/2+hd*1.5,(ad+bw)/2-ai,0]) rotate([90,0,0]) 
			cylinder(r=(hd+xw)/2, h = ad + bw*2 + xw,
			  center = true, $fn = 40);
		# translate([bl/2-hd*1.5,0,0]) rotate([90,0,0]) 
			cylinder(r=(mhd+xw)/2, h = (bw + xw),
			  center = true, $fn = 40);
		# translate([bl/2-hd*1.5-mhs,0,0]) rotate([90,0,0]) 
			cylinder(r=(mhd+xw)/2, h = (bw + xw),
			  center = true, $fn = 40);
	}
}
