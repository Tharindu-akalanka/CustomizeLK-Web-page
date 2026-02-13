"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, RotateCcw, Move, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomizeCanvas() {
    const [image, setImage] = useState<string | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
                // Reset position/scale on new upload
                setPosition({ x: 0, y: 0 });
                setScale(1);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        if (!image) return;
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setDragStart({ x: clientX - position.x, y: clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setPosition({
            x: clientX - dragStart.x,
            y: clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Calculate percentage coordinates based on 1200x1599 original size
    // Using CSS clip-path polygon for the masking shape
    // Coordinates: (609,1189) → (1162,446) → (1439,652) → (885,1395)
    // Normalized to 0-100%
    // 609/1200 = 50.75%, 1189/1599 = 74.36%
    // 1162/1200 = 96.83%, 446/1599 = 27.89%
    // 1439/1200 = 119.9% (Wait, 1439 > 1200 width? User coordinates might be scaled or off-canvas)
    // Let's re-verify width 1200. Coordinate 1439 is outside.
    // It's possible the user's coordinates are for a different resolution or scale.
    // Assuming the user provided coordinates relative to the image they provided (which I copied).
    // If the image I copied is indeed 1200w, then 1439 is outside.
    // However, I will use the pixel values directly in a container of the specific aspect ratio.

    // Let's define the containment box for the artwork area.
    // Bounding box of quad:
    // Min X: 609, Max X: 1439 (Width: 830)
    // Min Y: 446, Max Y: 1395 (Height: 949)

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl mx-auto">
            {/* Canvas Area */}
            <div className="flex-1 w-full bg-white rounded-xl shadow-sm border p-4 relative overflow-hidden select-none">
                <div
                    ref={containerRef}
                    className="relative w-full max-w-[600px] mx-auto aspect-[1200/1599]"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                >
                    {/* Base Sneaker Image */}
                    <Image
                        src="/sneaker-template.png"
                        alt="Sneaker Template"
                        fill
                        className="object-contain pointer-events-none z-10 relative"
                        priority
                    />

                    {/* Artwork Layer */}
                    {/* Using absolute positioning and clip-path to define the print area */}
                    {/* Since coordinates go outside 1200 width (1439), I will assume the container should allow overflow or the coordinate space is larger */}
                    {/* I'll use a wrapper that matches the coordinate system 1200x1599 */}

                    {/* Overlay Layer for Realism (Shadows/Highlights) */}
                    <div
                        className="absolute inset-0 z-30 pointer-events-none select-none"
                        style={{
                            clipPath: 'polygon(40.5% 59.4%, 77.4% 22.2%, 95.9% 32.5%, 59.0% 69.8%)',
                            mixBlendMode: 'multiply',
                            opacity: 0.8
                        }}
                    >
                        <Image
                            src="/sneaker-template.png"
                            alt="Shadow Overlay"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Artwork Layer */}
                    <div
                        className="absolute inset-0 z-20 overflow-hidden mix-blend-multiply"
                        style={{
                            clipPath: 'polygon(40.5% 59.4%, 77.4% 22.2%, 95.9% 32.5%, 59.0% 69.8%)',
                        }}
                    >
                        {image && (
                            <div
                                className="absolute pointer-events-auto cursor-move origin-center"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    width: '100%',
                                    height: '100%',
                                    // Added perspective and rotateY/rotateZ for better alignment with the shoe panel
                                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) perspective(1000px) rotateY(-10deg) rotateZ(36.7deg)`,
                                }}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleMouseDown}
                            >
                                <img
                                    src={image}
                                    alt="Uploaded Art"
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        )}
                    </div>

                    {/* Separate guide layer if we want it visible even without image, matching the clip-path above */}
                    {/* But clip-path clipped the border inside. Let's rely on the image clipping. */}

                    {/* Lighting/Shadow Overlay (Optional, for "Preserve shoe lighting") */}
                    {/* Since "multiply" is on the artwork, it naturally darkens. "Soft light" adds contrast. */}
                    {/* We might need a top layer of the shoe with "Hard Light" or "Overlay" if we had a separate shadow map. */}
                    {/* For now, just the base image + multiply blend is standard for simple mockups. */}

                </div>
            </div>

            {/* Controls */}
            <div className="w-full lg:w-80 space-y-6 bg-card p-6 rounded-xl border">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Customize</h2>
                    <p className="text-muted-foreground text-sm">Upload your artwork to design your shoe.</p>
                </div>

                <div className="space-y-4">
                    <Label htmlFor="image-upload" className="cursor-pointer block">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-accent/50 transition-colors">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-sm font-medium">Click to upload image</span>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </Label>

                    {image && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Selected Image</span>
                                <Button variant="ghost" size="sm" onClick={() => setImage(null)} className="h-8 text-destructive hover:text-destructive">
                                    <X className="h-4 w-4 mr-1" /> Remove
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Scale</Label>
                                    <span className="text-xs text-muted-foreground">{Math.round(scale * 100)}%</span>
                                </div>
                                <Slider
                                    value={[scale]}
                                    min={0.1}
                                    max={3}
                                    step={0.1}
                                    onValueChange={(vals) => setScale(vals[0])}
                                />
                            </div>

                            <div className="pt-4 border-t space-y-3">
                                <p className="text-xs text-muted-foreground mb-4">
                                    <Move className="inline h-3 w-3 mr-1" />
                                    Drag the image on the shoe to position it.
                                </p>

                                <Button className="w-full" onClick={() => {
                                    setPosition({ x: 0, y: 0 });
                                    setScale(1);
                                }}>
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Reset Position
                                </Button>


                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                    disabled={!image || isGenerating}
                                    onClick={async () => {
                                        if (!image) return;
                                        setIsGenerating(true);
                                        try {
                                            const { generateRealisticPreview } = await import("@/app/actions/generate-preview");
                                            const result = await generateRealisticPreview(image);

                                            if (result.success) {
                                                if (result.image) {
                                                    // Display the generated image
                                                    // Ideally in a modal. For now, let's open a simple modal or replace the view?
                                                    // Let's create a temporary full-screen overlay for the result.
                                                    const win = window.open("", "_blank");
                                                    if (win) {
                                                        win.document.write(`<img src="${result.image}" style="max-width:100%; height:auto;">`);
                                                        win.document.title = "AI Realistic Preview";
                                                    } else {
                                                        alert("Pop-up blocked! Could not show image.");
                                                    }
                                                } else if (result.text) {
                                                    alert("AI Description (Image generation unavailable):\n\n" + result.text);
                                                }
                                            } else {
                                                alert("AI Generation Failed: " + (result.error || "Unknown error"));
                                            }
                                        } catch (e) {
                                            alert("Error calling AI service");
                                        } finally {
                                            setIsGenerating(false);
                                        }
                                    }}
                                >
                                    <Smartphone className="h-4 w-4 mr-2" />
                                    {isGenerating ? "Analyzing..." : "Generate Realistic Preview (AI)"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
