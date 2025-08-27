export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.0.2 (a4e00ff)";
  };
  public: {
    Tables: {
      "**inventory_logs": {
        Row: {
          change: number | null;
          created_at: string;
          id: string;
          product_id: string | null;
          reason: string | null;
          staff_id: string | null;
        };
        Insert: {
          change?: number | null;
          created_at?: string;
          id?: string;
          product_id?: string | null;
          reason?: string | null;
          staff_id?: string | null;
        };
        Update: {
          change?: number | null;
          created_at?: string;
          id?: string;
          product_id?: string | null;
          reason?: string | null;
          staff_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_logs_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_logs_staff_id_fkey";
            columns: ["staff_id"];
            isOneToOne: false;
            referencedRelation: "staff";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image_url: string;
          name: string;
          published: boolean;
          slug: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url: string;
          name: string;
          published?: boolean;
          slug: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string;
          name?: string;
          published?: boolean;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      coupons: {
        Row: {
          campaign_name: string;
          code: string;
          created_at: string;
          discount_type: Database["public"]["Enums"]["discount_type_enum"];
          discount_value: number;
          end_date: string;
          id: string;
          image_url: string;
          published: boolean;
          start_date: string;
          updated_at: string;
        };
        Insert: {
          campaign_name: string;
          code: string;
          created_at?: string;
          discount_type?: Database["public"]["Enums"]["discount_type_enum"];
          discount_value: number;
          end_date: string;
          id?: string;
          image_url: string;
          published?: boolean;
          start_date: string;
          updated_at?: string;
        };
        Update: {
          campaign_name?: string;
          code?: string;
          created_at?: string;
          discount_type?: Database["public"]["Enums"]["discount_type_enum"];
          discount_value?: number;
          end_date?: string;
          id?: string;
          image_url?: string;
          published?: boolean;
          start_date?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          address: string | null;
          created_at: string;
          email: string;
          id: string;
          name: string;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          name: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          image_url: string;
          is_read: boolean;
          published: boolean;
          staff_id: string;
          title: string;
          type: Database["public"]["Enums"]["notification_type"];
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url: string;
          is_read?: boolean;
          published?: boolean;
          staff_id: string;
          title: string;
          type: Database["public"]["Enums"]["notification_type"];
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string;
          is_read?: boolean;
          published?: boolean;
          staff_id?: string;
          title?: string;
          type?: Database["public"]["Enums"]["notification_type"];
        };
        Relationships: [
          {
            foreignKeyName: "notifications_staff_id_fkey";
            columns: ["staff_id"];
            isOneToOne: false;
            referencedRelation: "staff";
            referencedColumns: ["id"];
          }
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          coupon_id: string | null;
          created_at: string;
          customer_id: string;
          id: string;
          invoice_no: string;
          order_time: string;
          payment_method: Database["public"]["Enums"]["payment_method_enum"];
          shipping_cost: number;
          status: Database["public"]["Enums"]["order_status_enum"];
          total_amount: number;
          updated_at: string;
        };
        Insert: {
          coupon_id?: string | null;
          created_at?: string;
          customer_id: string;
          id?: string;
          invoice_no: string;
          order_time?: string;
          payment_method?: Database["public"]["Enums"]["payment_method_enum"];
          shipping_cost: number;
          status?: Database["public"]["Enums"]["order_status_enum"];
          total_amount: number;
          updated_at?: string;
        };
        Update: {
          coupon_id?: string | null;
          created_at?: string;
          customer_id?: string;
          id?: string;
          invoice_no?: string;
          order_time?: string;
          payment_method?: Database["public"]["Enums"]["payment_method_enum"];
          shipping_cost?: number;
          status?: Database["public"]["Enums"]["order_status_enum"];
          total_amount?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          category_id: string;
          cost_price: number;
          created_at: string;
          description: string | null;
          id: string;
          image_url: string;
          min_stock_threshold: number;
          name: string;
          published: boolean;
          selling_price: number;
          sku: string;
          slug: string;
          stock: number;
          updated_at: string;
        };
        Insert: {
          category_id: string;
          cost_price: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url: string;
          min_stock_threshold?: number;
          name: string;
          published?: boolean;
          selling_price: number;
          sku: string;
          slug: string;
          stock: number;
          updated_at?: string;
        };
        Update: {
          category_id?: string;
          cost_price?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string;
          min_stock_threshold?: number;
          name?: string;
          published?: boolean;
          selling_price?: number;
          sku?: string;
          slug?: string;
          stock?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      staff: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          image_url: string | null;
          joining_date: string;
          name: string;
          phone: string | null;
          published: boolean;
          role_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          image_url?: string | null;
          joining_date?: string;
          name: string;
          phone?: string | null;
          published?: boolean;
          role_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          image_url?: string | null;
          joining_date?: string;
          name?: string;
          phone?: string | null;
          published?: boolean;
          role_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "staff_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "staff_roles";
            referencedColumns: ["id"];
          }
        ];
      };
      staff_roles: {
        Row: {
          display_name: string;
          id: number;
          is_default: boolean;
          name: Database["public"]["Enums"]["staff_role"];
        };
        Insert: {
          display_name: string;
          id?: number;
          is_default?: boolean;
          name: Database["public"]["Enums"]["staff_role"];
        };
        Update: {
          display_name?: string;
          id?: number;
          is_default?: boolean;
          name?: Database["public"]["Enums"]["staff_role"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize_super_admin_or_error: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      generate_slug: {
        Args: { text_input: string };
        Returns: string;
      };
      get_my_profile: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      discount_type_enum: "percentage" | "fixed";
      notification_type: "new_order" | "low_stock";
      order_status_enum: "delivered" | "cancelled" | "pending" | "processing";
      payment_method_enum: "cash" | "card" | "credit";
      staff_role: "super_admin" | "admin" | "cashier";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      discount_type_enum: ["percentage", "fixed"],
      notification_type: ["new_order", "low_stock"],
      order_status_enum: ["delivered", "cancelled", "pending", "processing"],
      payment_method_enum: ["cash", "card", "credit"],
      staff_role: ["super_admin", "admin", "cashier"],
    },
  },
} as const;
