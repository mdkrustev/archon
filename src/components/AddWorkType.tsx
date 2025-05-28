"use client";

import { useDynamicValue } from "@/contexts/DynamicValueContext";
import { useTranslationContext } from "@/i18n/TranslationContext";
import { useSession } from "next-auth/react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface WorkType {
    category: string;
    name: string;
}

const workTypeCategoriesKeys = [
    "preparation",
    "foundation",
    "rough_construction",
    "roofing",
    "facade",
    "interior_works"
];

export default function AddWorkType() {
    const { data: session, status } = useSession();
    const { values, setValue } = useDynamicValue();
    const { t } = useTranslationContext();

    const [workType, setWorkType] = useState<WorkType>({
        category: "",
        name: "",
    });

    const [errors, setErrors] = useState<{
        name?: string;
        category?: string;
    }>({});

    const validateForm = () => {
        const newErrors: { name?: string; category?: string } = {};

        if (!workType.name.trim()) {
            newErrors.name = t("validation.required");
        }

        if (!workType.category.trim()) {
            newErrors.category = t("validation.required");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSend = async () => {
        if (validateForm()) {
            try {
                const response = await fetch("/api/worktype/new", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(workType),
                });

                const result = await response.json();

                if (!response.ok) {
                    // Handle server errors (e.g. invalid category, Prisma issues)
                    throw new Error(result.error || "Failed to save work type");
                }

                // Success: close modal
                setValue("openAddWorkTypeForm", false);
            } catch (error: any) {
                console.error("Error sending workType:", error);
                alert(error.message); // Or better: display in UI
            }
        }
    };

    useEffect(() => {
        if (values.openAddWorkTypeForm) {
            setWorkType({ category: "", name: "" });
            setErrors({});
        }
    }, [values.openAddWorkTypeForm]);

    if (status === "loading")
        return <div className="p-[5px]">{t("loading")}...</div>;

    return (
        <>
            <AlertDialog open={values.openAddWorkTypeForm} onOpenChange={(value) => setValue("openAddWorkTypeForm", value)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">{t("newWorkType")}</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription></AlertDialogDescription>

                    <Card className="w-full">
                        <CardHeader>
                            <CardDescription>{t("addWorkTypeDescription")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    {/* Name Field */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">{t("name")}</Label>
                                        <Input
                                            id="name"
                                            value={workType.name}
                                            placeholder={t("enterName")}
                                            onChange={(e) => {
                                                setWorkType({ ...workType, name: e.target.value });
                                                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                                            }}
                                            className={errors.name ? "border-red-500" : ""}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Category Field */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">{t("category")}</Label>
                                        <Select
                                            value={workType.category}
                                            onValueChange={(value) => {
                                                setWorkType({ ...workType, category: value });
                                                if (errors.category)
                                                    setErrors((prev) => ({ ...prev, category: "" }));
                                            }}
                                        >
                                            <SelectTrigger
                                                id="framework"
                                                className={errors.category ? "border-red-500" : ""}
                                            >
                                                <SelectValue placeholder={t("selectCategory")} />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                {workTypeCategoriesKeys.map((key: string) => (
                                                    <SelectItem key={key} value={key}>
                                                        {t(`workTypeCategories.${key}`)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-sm text-red-500">{errors.category}</p>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <AlertDialogFooter className="flex justify-between">
                        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                        <Button className="cursor-pointer" onClick={handleSend}>
                            {t("add")}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}